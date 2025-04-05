// app/api/incidents/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    const severity = searchParams.get('severity');
    const region = searchParams.get('region');
    const aiSystemType = searchParams.get('aiSystemType');
    
    // Build filter based on query parameters
    const filter: any = {};
    
    if (severity) filter.severity = severity;
    if (region) filter.region = region;
    if (aiSystemType) filter.aiSystemType = aiSystemType;
    
    const incidents = await prisma.incident.findMany({
      where: filter,
      include: {
        contributingFactors: true,
        timeline: {
          orderBy: {
            date: 'asc'
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    });
    
    return NextResponse.json(incidents);
  } catch (error) {
    console.error('Error fetching incidents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch incidents' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.title || !data.description || !data.date || !data.region || 
        !data.severity || !data.aiSystemType || !data.status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const incident = await prisma.incident.create({
      data: {
        title: data.title,
        description: data.description,
        date: new Date(data.date),
        region: data.region,
        country: data.country || null,
        severity: data.severity,
        aiSystemType: data.aiSystemType,
        status: data.status,
        impactDescription: data.impactDescription || null,
        sourceUrl: data.sourceUrl || null,
        
        // Handle related data if provided
        contributingFactors: data.contributingFactors ? {
          create: data.contributingFactors
        } : undefined,
        
        timeline: data.timeline ? {
          create: data.timeline.map((event: any) => ({
            ...event,
            date: new Date(event.date)
          }))
        } : undefined
      },
      include: {
        contributingFactors: true,
        timeline: true
      }
    });
    
    return NextResponse.json(incident, { status: 201 });
  } catch (error) {
    console.error('Error creating incident:', error);
    return NextResponse.json(
      { error: 'Failed to create incident' },
      { status: 500 }
    );
  }
}