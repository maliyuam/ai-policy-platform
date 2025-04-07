// src/app/api/insights/route.ts
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AIService } from '@/lib/services/ai';
import { prisma } from '@/lib/prisma';

// Generate insights based on a natural language prompt
export async function POST(request: Request) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    const { prompt, saveQuery, queryTitle } = body;
    
    if (!prompt) {
      return NextResponse.json(
        { message: 'Prompt is required' },
        { status: 400 }
      );
    }
    
    // Generate insights
    const result = await AIService.generateInsight({
      prompt,
      userId: session.user?.id as string,
      saveQuery,
      queryTitle,
    });
    
    if (result.error) {
      return NextResponse.json(
        { message: result.error },
        { status: 500 }
      );
    }
    
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('AI insights API error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred generating insights' },
      { status: 500 }
    );
  }
}

// Get saved queries and visualizations
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
    
    const { searchParams } = new URL(request.url);
    const queryId = searchParams.get('queryId');
    
    if (queryId) {
      // Get a specific query and its visualizations
      const query = await prisma.savedQuery.findUnique({
        where: { id: queryId },
        include: {
          visualizations: true,
        },
      });
      
      if (!query) {
        return NextResponse.json(
          { message: 'Query not found' },
          { status: 404 }
        );
      }
      
      // Check if the query belongs to the user or is public
      if (query.userId !== session.user?.id && !query.public) {
        return NextResponse.json(
          { message: 'Unauthorized to access this query' },
          { status: 403 }
        );
      }
      
      return NextResponse.json({ query });
    } else {
      // Get all saved queries for the user
      const queries = await prisma.savedQuery.findMany({
        where: {
          OR: [
            { userId: session.user?.id },
            { public: true },
          ],
        },
        orderBy: { updatedAt: 'desc' },
        include: {
          visualizations: {
            select: {
              id: true,
              title: true,
              chartType: true,
            },
          },
        },
      });
      
      return NextResponse.json({ queries });
    }
  } catch (error: any) {
    console.error('AI insights API error:', error);
    return NextResponse.json(
      { message: error.message || 'An error occurred fetching saved queries' },
      { status: 500 }
    );
  }
}