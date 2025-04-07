// src/lib/services/ai.ts
import OpenAI from 'openai';
import { prisma } from '@/lib/prisma';

interface InsightGenerationOptions {
  prompt: string;
  userId: string;
  saveQuery?: boolean;
  queryTitle?: string;
}

interface ChartGenerationResult {
  title: string;
  description: string;
  chartType: string;
  chartData: any;
  chartConfig: any;
  sqlQuery?: string;
  error?: string;
}

export class AIService {
  private static openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
  
  /**
   * Generate insights based on a natural language prompt
   */
  public static async generateInsight({
    prompt,
    userId,
    saveQuery = true,
    queryTitle,
  }: InsightGenerationOptions): Promise<ChartGenerationResult> {
    try {
      // 1. Get data counts to provide context
      const incidentCount = await prisma.incident.count();
      const legislationCount = await prisma.legislation.count();
      const consultationCount = await prisma.consultation.count();
      
      // 2. Analyze the prompt to determine what data is needed
      const analysisCompletion = await this.openai.chat.completions.create({
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: `You are an AI assistant specialized in data analysis and visualization. Your task is to analyze a user query about AI policy data and determine:
            1. What type of data they need (Incidents, Legislation, Consultations)
            2. What analysis/visualization would be most appropriate
            3. What SQL query would extract the necessary data
            4. What chart type should be used to visualize it
            
            Available data tables and fields:
            
            - Incident: id, title, description, date, region, country, severity, aiSystemType, status, impactDescription
            - Legislation: id, title, type, status, jurisdiction, region, description, dateProposed, dateEnacted
            - Consultation: id, title, description, status, startDate, endDate, domain, region
            
            Current data counts:
            - Incidents: ${incidentCount}
            - Legislation: ${legislationCount}
            - Consultations: ${consultationCount}
            
            Respond in JSON format only with the following structure:
            {
              "dataType": "Incident|Legislation|Consultation|Combined",
              "analysisType": "Count|Distribution|Trend|Comparison",
              "sqlQuery": "SQL query to extract the data",
              "chartType": "Bar|Line|Pie|Scatter|Table",
              "chartTitle": "Suggested title for the chart",
              "description": "Brief explanation of the analysis"
            }`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
      });
      
      // 3. Parse the analysis result
      const analysisResult = JSON.parse(analysisCompletion.choices[0].message.content || '{}');
      
      // 4. Execute the SQL query (in a real app, this would be more secure)
      let queryResult;
      try {
        // Use Prisma's queryRaw to execute the SQL
        // In production, this should be properly parameterized and secured
        queryResult = await prisma.$queryRaw`${analysisResult.sqlQuery}`;
      } catch (error) {
        console.error('SQL error:', error);
        
        // Fallback to a safer approach if SQL fails
        queryResult = await this.getFallbackData(analysisResult.dataType, analysisResult.analysisType);
      }
      
      // 5. Generate chart configuration based on the data
      const chartResult = await this.generateChartConfig(
        queryResult as any[],
        analysisResult.chartType,
        analysisResult.chartTitle,
        analysisResult.description
      );
      
      // 6. Save the query if requested
      if (saveQuery) {
        const savedQuery = await prisma.savedQuery.create({
          data: {
            userId,
            title: queryTitle || analysisResult.chartTitle,
            prompt,
            parameters: analysisResult,
            resultType: analysisResult.chartType,
          },
        });
        
        // Save the visualization
        await prisma.visualization.create({
          data: {
            queryId: savedQuery.id,
            title: analysisResult.chartTitle,
            description: analysisResult.description,
            chartType: analysisResult.chartType,
            chartData: JSON.parse(JSON.stringify(queryResult)),
            chartConfig: chartResult.chartConfig,
          },
        });
      }
      
      return {
        title: analysisResult.chartTitle,
        description: analysisResult.description,
        chartType: analysisResult.chartType,
        chartData: queryResult,
        chartConfig: chartResult.chartConfig,
        sqlQuery: analysisResult.sqlQuery,
      };
    } catch (error: any) {
      console.error('AI insight generation error:', error);
      
      return {
        title: 'Error Generating Insight',
        description: 'An error occurred while generating the requested insight.',
        chartType: 'Error',
        chartData: [],
        chartConfig: {},
        error: error.message,
      };
    }
  }
  
  /**
   * Get fallback data if SQL query fails
   */
  private static async getFallbackData(dataType: string, analysisType: string): Promise<any[]> {
    switch (dataType) {
      case 'Incident':
        if (analysisType === 'Distribution') {
          // Get incidents by severity
          const incidents = await prisma.incident.groupBy({
            by: ['severity'],
            _count: {
              id: true,
            },
          });
          
          return incidents.map(item => ({
            category: item.severity,
            value: item._count.id,
          }));
        } else {
          // Get incidents by region
          const incidents = await prisma.incident.groupBy({
            by: ['region'],
            _count: {
              id: true,
            },
          });
          
          return incidents.map(item => ({
            category: item.region,
            value: item._count.id,
          }));
        }
        
      case 'Legislation':
        if (analysisType === 'Distribution') {
          // Get legislation by type
          const legislation = await prisma.legislation.groupBy({
            by: ['type'],
            _count: {
              id: true,
            },
          });
          
          return legislation.map(item => ({
            category: item.type,
            value: item._count.id,
          }));
        } else {
          // Get legislation by status
          const legislation = await prisma.legislation.groupBy({
            by: ['status'],
            _count: {
              id: true,
            },
          });
          
          return legislation.map(item => ({
            category: item.status,
            value: item._count.id,
          }));
        }
        
      case 'Consultation':
        if (analysisType === 'Distribution') {
          // Get consultations by status
          const consultations = await prisma.consultation.groupBy({
            by: ['status'],
            _count: {
              id: true,
            },
          });
          
          return consultations.map(item => ({
            category: item.status,
            value: item._count.id,
          }));
        } else {
          // Get consultations by domain
          const consultations = await prisma.consultation.groupBy({
            by: ['domain'],
            _count: {
              id: true,
            },
          });
          
          return consultations.map(item => ({
            category: item.domain,
            value: item._count.id,
          }));
        }
        
      default:
        // Combined analysis - count by data type
        const incidents = await prisma.incident.count();
        const legislation = await prisma.legislation.count();
        const consultations = await prisma.consultation.count();
        
        return [
          { category: 'Incidents', value: incidents },
          { category: 'Legislation', value: legislation },
          { category: 'Consultations', value: consultations },
        ];
    }
  }
  
  /**
   * Generate chart configuration based on data and type
   */
  private static async generateChartConfig(
    data: any[],
    chartType: string,
    title: string,
    description: string
  ): Promise<{ chartConfig: any }> {
    // Default colors for charts
    const colors = [
      '#3b82f6', // blue-500
      '#ef4444', // red-500
      '#10b981', // emerald-500
      '#f59e0b', // amber-500
      '#8b5cf6', // violet-500
      '#ec4899', // pink-500
    ];
    
    let chartConfig: any = {
      title: {
        text: title,
        align: 'center',
      },
      colors,
    };
    
    switch (chartType.toLowerCase()) {
      case 'bar':
        chartConfig = {
          ...chartConfig,
          chart: {
            type: 'bar',
            height: 350,
          },
          xaxis: {
            categories: data.map(item => item.category || item.region || item.type || item.name),
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '55%',
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val}`,
            },
          },
        };
        break;
        
      case 'pie':
        chartConfig = {
          ...chartConfig,
          chart: {
            type: 'pie',
            height: 350,
          },
          labels: data.map(item => item.category || item.region || item.type || item.name),
          tooltip: {
            y: {
              formatter: (val: number) => `${val}`,
            },
          },
          legend: {
            position: 'bottom',
          },
        };
        break;
        
      case 'line':
        // Assume data has x and y values
        chartConfig = {
          ...chartConfig,
          chart: {
            type: 'line',
            height: 350,
          },
          xaxis: {
            categories: data.map(item => item.x || item.date || item.category || item.name),
          },
          stroke: {
            curve: 'smooth',
            width: 3,
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            y: {
              formatter: (val: number) => `${val}`,
            },
          },
        };
        break;
        
      case 'scatter':
        chartConfig = {
          ...chartConfig,
          chart: {
            type: 'scatter',
            height: 350,
          },
          xaxis: {
            type: 'numeric',
          },
          yaxis: {
            type: 'numeric',
          },
          tooltip: {
            x: {
              formatter: (val: number) => `${val}`,
            },
            y: {
              formatter: (val: number) => `${val}`,
            },
          },
        };
        break;
        
      case 'table':
        // No specific chart config for tables
        chartConfig = {
          type: 'table',
          columns: Object.keys(data[0] || {}).map(key => ({
            Header: key.charAt(0).toUpperCase() + key.slice(1),
            accessor: key,
          })),
        };
        break;
        
      default:
        // Default to bar chart
        chartConfig = {
          ...chartConfig,
          chart: {
            type: 'bar',
            height: 350,
          },
          xaxis: {
            categories: data.map(item => item.category || item.region || item.type || item.name),
          },
        };
    }
    
    return { chartConfig };
  }
}