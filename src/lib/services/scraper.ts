// src/lib/services/scraper.ts
import axios from 'axios';
import * as cheerio from 'cheerio';
import { prisma } from '@/lib/prisma';

export interface ScraperOptions {
  url: string;
  sourceId?: string;
  sourceName?: string;
}

export interface ScrapingResult {
  success: boolean;
  message: string;
  data?: any[];
  error?: any;
}

/**
 * Service for scraping data from aipolicy.africa
 */
export class ScraperService {
  
  /**
   * Initialize a scraper for a specific source
   */
  public static async initializeSource(url: string, name: string): Promise<string> {
    const source = await prisma.scrapedSource.upsert({
      where: { url },
      update: { name, status: 'Pending' },
      create: {
        url,
        name,
        status: 'Pending',
      },
    });
    
    return source.id;
  }
  
  /**
   * Main scraping method
   */
  public static async scrape({ url, sourceId, sourceName }: ScraperOptions): Promise<ScrapingResult> {
    try {
      // Initialize the source record if needed
      if (!sourceId && sourceName) {
        sourceId = await this.initializeSource(url, sourceName);
      }
      
      // Update source status to processing
      if (sourceId) {
        await prisma.scrapedSource.update({
          where: { id: sourceId },
          data: { status: 'Processing', lastScraped: new Date() },
        });
      }
      
      // Fetch the page HTML
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'AI Policy Platform Research Bot/1.0'
        }
      });
      
      // Parse the HTML with cheerio
      const $ = cheerio.load(response.data);
      const results: any[] = [];
      
      // Determine the type of page based on URL or content
      if (url.includes('/policies')) {
        await this.scrapePolicies($, results);
      } else if (url.includes('/incidents')) {
        await this.scrapeIncidents($, results);
      } else if (url.includes('/consultations')) {
        await this.scrapeConsultations($, results);
      } else {
        // Try to detect page type from content
        if ($('.policy-list, .policy-item').length > 0) {
          await this.scrapePolicies($, results);
        } else if ($('.incident-list, .incident-item').length > 0) {
          await this.scrapeIncidents($, results);
        } else if ($('.consultation-list, .consultation-item').length > 0) {
          await this.scrapeConsultations($, results);
        } else {
          throw new Error('Unknown page type');
        }
      }
      
      // Save results to database if sourceId is provided
      if (sourceId && results.length > 0) {
        for (const result of results) {
          await prisma.scrapedDataPoint.create({
            data: {
              sourceId,
              dataType: result.type,
              rawData: result,
            },
          });
        }
        
        // Update source status to completed
        await prisma.scrapedSource.update({
          where: { id: sourceId },
          data: { 
            status: 'Completed',
            lastScraped: new Date(),
          },
        });
      }
      
      return {
        success: true,
        message: `Successfully scraped ${results.length} items`,
        data: results,
      };
    } catch (error: any) {
      console.error('Scraping error:', error);
      
      // Update source status to error if sourceId is provided
      if (sourceId) {
        await prisma.scrapedSource.update({
          where: { id: sourceId },
          data: { 
            status: 'Error',
            errorMessage: error.message || 'Unknown error occurred',
          },
        });
      }
      
      return {
        success: false,
        message: error.message || 'An error occurred during scraping',
        error,
      };
    }
  }
  
  /**
   * Scrape policies from the page
   */
  private static async scrapePolicies($: cheerio.CheerioAPI, results: any[]): Promise<void> {
    // This is a placeholder implementation - actual selectors would depend on the site structure
    $('.policy-item, .policy, article').each((index, element) => {
      const $element = $(element);
      
      const title = $element.find('.policy-title, h2, h3').first().text().trim();
      const description = $element.find('.policy-description, .description, p').first().text().trim();
      const country = $element.find('.policy-country, .country').first().text().trim();
      const status = $element.find('.policy-status, .status').first().text().trim();
      const type = $element.find('.policy-type, .type').first().text().trim();
      const date = $element.find('.policy-date, .date').first().text().trim();
      
      // Only add if we have at least a title
      if (title) {
        results.push({
          type: 'Legislation',
          title,
          description,
          country,
          status: status || 'Unknown',
          policyType: type || 'Unknown',
          date: date ? new Date(date) : null,
          url: $element.find('a').first().attr('href'),
        });
      }
    });
  }
  
  /**
   * Scrape incidents from the page
   */
  private static async scrapeIncidents($: cheerio.CheerioAPI, results: any[]): Promise<void> {
    // This is a placeholder implementation - actual selectors would depend on the site structure
    $('.incident-item, .incident, article').each((index, element) => {
      const $element = $(element);
      
      const title = $element.find('.incident-title, h2, h3').first().text().trim();
      const description = $element.find('.incident-description, .description, p').first().text().trim();
      const region = $element.find('.incident-region, .region').first().text().trim();
      const severity = $element.find('.incident-severity, .severity').first().text().trim();
      const date = $element.find('.incident-date, .date').first().text().trim();
      
      // Only add if we have at least a title
      if (title) {
        results.push({
          type: 'Incident',
          title,
          description,
          region: region || 'Unknown',
          severity: severity || 'Medium',
          date: date ? new Date(date) : null,
          url: $element.find('a').first().attr('href'),
        });
      }
    });
  }
  
  /**
   * Scrape consultations from the page
   */
  private static async scrapeConsultations($: cheerio.CheerioAPI, results: any[]): Promise<void> {
    // This is a placeholder implementation - actual selectors would depend on the site structure
    $('.consultation-item, .consultation, article').each((index, element) => {
      const $element = $(element);
      
      const title = $element.find('.consultation-title, h2, h3').first().text().trim();
      const description = $element.find('.consultation-description, .description, p').first().text().trim();
      const status = $element.find('.consultation-status, .status').first().text().trim();
      const domain = $element.find('.consultation-domain, .domain').first().text().trim();
      const startDate = $element.find('.consultation-start-date, .start-date').first().text().trim();
      const endDate = $element.find('.consultation-end-date, .end-date').first().text().trim();
      
      // Only add if we have at least a title
      if (title) {
        results.push({
          type: 'Consultation',
          title,
          description,
          status: status || 'Unknown',
          domain: domain || 'General',
          startDate: startDate ? new Date(startDate) : null,
          endDate: endDate ? new Date(endDate) : null,
          url: $element.find('a').first().attr('href'),
        });
      }
    });
  }
  
  /**
   * Process scraped data and insert into appropriate tables
   */
  public static async processScrapedData(): Promise<void> {
    const unprocessedData = await prisma.scrapedDataPoint.findMany({
      where: { processed: false },
      include: { source: true },
      take: 100, // Process in batches
    });
    
    for (const dataPoint of unprocessedData) {
      try {
        let processedId: string | null = null;
        
        switch (dataPoint.dataType) {
          case 'Legislation':
            processedId = await this.processLegislation(dataPoint.rawData);
            break;
          case 'Incident':
            processedId = await this.processIncident(dataPoint.rawData);
            break;
          case 'Consultation':
            processedId = await this.processConsultation(dataPoint.rawData);
            break;
          default:
            console.warn(`Unknown data type: ${dataPoint.dataType}`);
        }
        
        // Update the data point as processed
        await prisma.scrapedDataPoint.update({
          where: { id: dataPoint.id },
          data: {
            processed: true,
            processedId,
          },
        });
      } catch (error) {
        console.error(`Error processing data point ${dataPoint.id}:`, error);
      }
    }
  }
  
  /**
   * Process legislation data
   */
  private static async processLegislation(data: any): Promise<string> {
    // Check if the legislation already exists by title and country
    const existing = await prisma.legislation.findFirst({
      where: {
        title: { contains: data.title, mode: 'insensitive' },
        jurisdiction: { contains: data.country, mode: 'insensitive' },
      },
    });
    
    if (existing) {
      return existing.id;
    }
    
    // Create the legislation
    const legislation = await prisma.legislation.create({
      data: {
        title: data.title,
        description: data.description || 'No description available',
        type: data.policyType || 'Unknown',
        status: data.status || 'Unknown',
        jurisdiction: data.country || 'Unknown',
        region: this.determineRegion(data.country),
        sourceUrl: data.url,
        dateProposed: data.date || null,
      },
    });
    
    return legislation.id;
  }
  
  /**
   * Process incident data
   */
  private static async processIncident(data: any): Promise<string> {
    // Check if the incident already exists by title
    const existing = await prisma.incident.findFirst({
      where: {
        title: { contains: data.title, mode: 'insensitive' },
      },
    });
    
    if (existing) {
      return existing.id;
    }
    
    // Create the incident
    const incident = await prisma.incident.create({
      data: {
        title: data.title,
        description: data.description || 'No description available',
        date: data.date || new Date(),
        region: data.region || 'Unknown',
        severity: data.severity || 'Medium',
        aiSystemType: data.aiSystemType || 'Unknown',
        status: 'Under Investigation',
        sourceUrl: data.url,
      },
    });
    
    return incident.id;
  }
  
  /**
   * Process consultation data
   */
  private static async processConsultation(data: any): Promise<string> {
    // Check if the consultation already exists by title
    const existing = await prisma.consultation.findFirst({
      where: {
        title: { contains: data.title, mode: 'insensitive' },
      },
    });
    
    if (existing) {
      return existing.id;
    }
    
    // Create the consultation
    const consultation = await prisma.consultation.create({
      data: {
        title: data.title,
        description: data.description || 'No description available',
        status: data.status || 'Open',
        domain: data.domain || 'General',
        region: data.region || 'Unknown',
        startDate: data.startDate || new Date(),
        endDate: data.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      },
    });
    
    return consultation.id;
  }
  
  /**
   * Determine region based on country
   */
  private static determineRegion(country: string): string {
    const eastAfrica = ['Kenya', 'Tanzania', 'Uganda', 'Rwanda', 'Burundi', 'South Sudan', 'Ethiopia', 'Somalia', 'Djibouti', 'Eritrea'];
    const westAfrica = ['Nigeria', 'Ghana', 'Ivory Coast', 'Senegal', 'Guinea', 'Mali', 'Burkina Faso', 'Benin', 'Togo', 'Sierra Leone', 'Liberia', 'Niger', 'Gambia', 'Guinea-Bissau', 'Cape Verde'];
    const northAfrica = ['Egypt', 'Libya', 'Tunisia', 'Algeria', 'Morocco', 'Sudan'];
    const southernAfrica = ['South Africa', 'Namibia', 'Botswana', 'Zimbabwe', 'Mozambique', 'Zambia', 'Malawi', 'Angola', 'Lesotho', 'Eswatini', 'Madagascar', 'Mauritius', 'Seychelles'];
    const centralAfrica = ['Cameroon', 'Central African Republic', 'Chad', 'Democratic Republic of the Congo', 'Republic of the Congo', 'Equatorial Guinea', 'Gabon', 'São Tomé and Príncipe'];
    
    if (eastAfrica.some(c => country.includes(c))) return 'East Africa';
    if (westAfrica.some(c => country.includes(c))) return 'West Africa';
    if (northAfrica.some(c => country.includes(c))) return 'North Africa';
    if (southernAfrica.some(c => country.includes(c))) return 'Southern Africa';
    if (centralAfrica.some(c => country.includes(c))) return 'Central Africa';
    
    return 'Unknown';
  }
}