// src/app/api/scraper/route.ts
import { NextResponse } from 'next/server';
import { ScraperService } from '@/lib/services/scraper';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// Trigger data scraping manually
export async function POST(request: Request) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'Admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { url, sourceName } = body;
    
    if (!url) {
      return NextResponse.json(
        { message: 'URL is required' },
        { status: 400 }
      );
    }
    
    // Start the scraping process
    const result = await ScraperService.scrape({
      url,
      sourceName: sourceName || 'Manual Scrape',
    });
    
    if (!result.success) {
      return NextResponse.json(
        { message: result.message, error: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Scraper API error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred during scraping' },
      { status: 500 }
    );
  }
}

// Get scraping sources and status
export async function GET(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Get all scraping sources
    const sources = await prisma.scrapedSource.findMany({
      orderBy: { lastScraped: 'desc' },
      include: {
        _count: {
          select: { dataPoints: true }
        }
      }
    });
    
    return NextResponse.json({ sources });
  } catch (error: any) {
    console.error('Scraper API error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred fetching scraping sources' },
      { status: 500 }
    );
  }
}

// Process the scraped data
export async function PUT(request: Request) {
  try {
    // Check authentication and authorization
    const session = await getServerSession(authOptions);
    
    if (!session || session.user?.role !== 'Admin') {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    // Process the scraped data
    await ScraperService.processScrapedData();
    
    return NextResponse.json({
      message: 'Data processing completed successfully'
    });
  } catch (error: any) {
    console.error('Data processing error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred during data processing' },
      { status: 500 }
    );
  }
}