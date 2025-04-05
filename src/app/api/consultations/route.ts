// app/api/consultations/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const status = searchParams.get('status');
    const domain = searchParams.get('domain');
    const region = searchParams.get('region');
    
    // Build filter based on query parameters
    const filter: any = {};
    
    if (status) filter.status = status;
    if (domain) filter.domain = domain;
    if (region) filter.region = region;
    
    const consultations = await prisma.consultation.findMany({
      where: filter,
      include: {
        legislation: {
          select: {
            id: true,
            title: true,
            jurisdiction: true
          }
        },
        comments: {
          where: {
            parentId: null // Only include top-level comments
          },
          include: {
            replies: {
              include: {
                replies: true // Include up to two levels of replies
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: { comments: true }
        }
      },
      orderBy: [
        {
          status: 'asc' // 'Open' comes before 'Closed' alphabetically
        },
        {
          endDate: 'asc' // Ending soon first
        }
      ]
    });
    
    return NextResponse.json(consultations);
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.description || !data.status || 
        !data.startDate || !data.endDate || !data.domain || !data.region) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the consultation
    const consultation = await prisma.consultation.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        domain: data.domain,
        region: data.region,
        legislationId: data.legislationId || null
      },
      include: {
        legislation: {
          select: {
            id: true,
            title: true
          }
        }
      }
    });
    
    return NextResponse.json(consultation, { status: 201 });
  } catch (error) {
    console.error('Error creating consultation:', error);
    return NextResponse.json(
      { error: 'Failed to create consultation' },
      { status: 500 }
    );
  }
}

// Add a comment to a consultation
export async function PUT(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.consultationId || !data.content || !data.authorName || !data.authorType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create the comment
    const comment = await prisma.comment.create({
      data: {
        content: data.content,
        authorName: data.authorName,
        authorType: data.authorType,
        authorVerified: data.authorVerified || false,
        consultationId: data.consultationId,
        parentId: data.parentId || null
      }
    });
    
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'Failed to add comment' },
      { status: 500 }
    );
  }
}