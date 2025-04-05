// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Get counts for various entities
    const incidentCount = await prisma.incident.count();
    const legislationCount = await prisma.legislation.count();
    const openConsultationCount = await prisma.consultation.count({
      where: {
        status: 'Open'
      }
    });
    
    // Get incidents by severity
    const incidentsBySeverity = await prisma.$queryRaw`
      SELECT severity, COUNT(*) as count FROM Incident
      GROUP BY severity
      ORDER BY 
        CASE 
          WHEN severity = 'Critical' THEN 1
          WHEN severity = 'High' THEN 2
          WHEN severity = 'Medium' THEN 3
          WHEN severity = 'Low' THEN 4
        END
    `;
    
    // Get incidents by region
    const incidentsByRegion = await prisma.$queryRaw`
      SELECT region, COUNT(*) as count FROM Incident
      GROUP BY region
      ORDER BY count DESC
    `;
    
    // Get legislation by type
    const legislationByType = await prisma.$queryRaw`
      SELECT type, COUNT(*) as count FROM Legislation
      GROUP BY type
      ORDER BY count DESC
    `;
    
    // Get legislation by status
    const legislationByStatus = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count FROM Legislation
      GROUP BY status
      ORDER BY count DESC
    `;
    
    // Get legislation by region
    const legislationByRegion = await prisma.$queryRaw`
      SELECT region, COUNT(*) as count FROM Legislation
      GROUP BY region
      ORDER BY count DESC
    `;
    
    // Get consultations by domain
    const consultationsByDomain = await prisma.$queryRaw`
      SELECT domain, COUNT(*) as count FROM Consultation
      GROUP BY domain
      ORDER BY count DESC
    `;
    
    // Get consultations by status
    const consultationsByStatus = await prisma.$queryRaw`
      SELECT status, COUNT(*) as count FROM Consultation
      GROUP BY status
      ORDER BY 
        CASE 
          WHEN status = 'Open' THEN 1
          WHEN status = 'Upcoming' THEN 2
          WHEN status = 'Closed' THEN 3
        END
    `;
    
    // Get consultations by region
    const consultationsByRegion = await prisma.$queryRaw`
      SELECT region, COUNT(*) as count FROM Consultation
      GROUP BY region
      ORDER BY count DESC
    `;
    
    // Get recent activity (combined from all entities)
    const recentIncidents = await prisma.incident.findMany({
      select: {
        id: true,
        title: true,
        severity: true,
        region: true,
        date: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 5
    });
    
    const recentLegislation = await prisma.legislation.findMany({
      select: {
        id: true,
        title: true,
        type: true,
        status: true,
        jurisdiction: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 5
    });
    
    const recentConsultations = await prisma.consultation.findMany({
      select: {
        id: true,
        title: true,
        domain: true,
        status: true,
        region: true,
        updatedAt: true
      },
      orderBy: {
        updatedAt: 'desc'
      },
      take: 5
    });
    
    // Combine and sort recent activity
    const recentActivity = [
      ...recentIncidents.map(item => ({
        ...item,
        type: 'incident'
      })),
      ...recentLegislation.map(item => ({
        ...item,
        type: 'legislation'
      })),
      ...recentConsultations.map(item => ({
        ...item,
        type: 'consultation'
      }))
    ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 10);
    
    // Get upcoming end dates for open consultations
    const upcomingConsultations = await prisma.consultation.findMany({
      where: {
        status: 'Open',
        endDate: {
          gte: new Date()
        }
      },
      select: {
        id: true,
        title: true,
        endDate: true,
        domain: true,
        region: true
      },
      orderBy: {
        endDate: 'asc'
      },
      take: 5
    });
    
    return NextResponse.json({
      counts: {
        incidents: incidentCount,
        legislation: legislationCount,
        openConsultations: openConsultationCount
      },
      distribution: {
        incidentsBySeverity,
        incidentsByRegion,
        legislationByType,
        legislationByStatus,
        legislationByRegion,
        consultationsByDomain,
        consultationsByStatus,
        consultationsByRegion
      },
      recentActivity,
      upcomingConsultations
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}