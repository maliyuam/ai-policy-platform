// app/api/legislation/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const region = searchParams.get('region');
    const categoryId = searchParams.get('categoryId');
    
    // Build filter based on query parameters
    let filter: any = {};
    
    if (type) filter.type = type;
    if (status) filter.status = status;
    if (region) filter.region = region;
    
    // Handle category filter differently as it's a relation
    if (categoryId) {
      filter.categories = {
        some: {
          categoryId: categoryId
        }
      };
    }
    
    const legislation = await prisma.legislation.findMany({
      where: filter,
      include: {
        categories: {
          include: {
            category: true
          }
        },
        consultations: {
          where: {
            status: 'Open'
          },
          select: {
            id: true,
            title: true,
            endDate: true
          }
        }
      },
      orderBy: [
        {
          dateEnacted: 'desc'
        },
        {
          dateProposed: 'desc'
        }
      ]
    });
    
    return NextResponse.json(legislation);
  } catch (error) {
    console.error('Error fetching legislation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch legislation' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.type || !data.status || !data.jurisdiction || !data.region || !data.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process dates
    const dateProposed = data.dateProposed ? new Date(data.dateProposed) : null;
    const dateEnacted = data.dateEnacted ? new Date(data.dateEnacted) : null;
    
    // Create the legislation
    const legislation = await prisma.legislation.create({
      data: {
        title: data.title,
        type: data.type,
        status: data.status,
        jurisdiction: data.jurisdiction,
        region: data.region,
        description: data.description,
        content: data.content || null,
        dateProposed: dateProposed,
        dateEnacted: dateEnacted,
        sourceUrl: data.sourceUrl || null,
        
        // Handle categories if provided
        categories: data.categories ? {
          create: data.categories.map((categoryId: string) => ({
            categoryId
          }))
        } : undefined
      },
      include: {
        categories: {
          include: {
            category: true
          }
        }
      }
    });
    
    return NextResponse.json(legislation, { status: 201 });
  } catch (error) {
    console.error('Error creating legislation:', error);
    return NextResponse.json(
      { error: 'Failed to create legislation' },
      { status: 500 }
    );
  }
}