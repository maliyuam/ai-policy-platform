// components/dashboard/AnalyticsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Link from 'next/link';

// Mock data to display if API fails
const mockDashboardData = {
  counts: {
    incidents: 27,
    legislation: 21,
    openConsultations: 17
  },
  distribution: {
    incidentsBySeverity: [
      { severity: "Critical", count: 5 },
      { severity: "High", count: 12 },
      { severity: "Medium", count: 8 },
      { severity: "Low", count: 2 }
    ],
    incidentsByRegion: [
      { region: "East Africa", count: 9 },
      { region: "West Africa", count: 7 },
      { region: "Southern Africa", count: 6 },
      { region: "North Africa", count: 3 },
      { region: "Central Africa", count: 2 }
    ],
    legislationByType: [
      { type: "Law", count: 8 },
      { type: "Regulation", count: 5 },
      { type: "Framework", count: 5 },
      { type: "Bill", count: 3 }
    ],
    legislationByStatus: [
      { status: "Enacted", count: 11 },
      { status: "Proposed", count: 7 },
      { status: "Under Review", count: 3 }
    ],
    // Add more mock data as needed...
  },
  recentActivity: [
    {
      id: "1",
      title: "Biased Facial Recognition Deployment in Nairobi",
      type: "incident",
      severity: "High",
      region: "East Africa",
      updatedAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Ethical AI Framework",
      type: "legislation",
      status: "Enacted",
      jurisdiction: "Nigeria",
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    // Add more mock data as needed...
  ],
};

// Main component
export default function AnalyticsDashboard() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'all' | '6m' | '3m' | '1m'>('all');
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        
        if (!response.ok) {
          throw new Error('Failed to fetch dashboard data');
        }
        
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setError('Failed to load dashboard data. Please try again.');
        // Use mock data on error
        setData(mockDashboardData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // If no data is available, use mock data
  const displayData = data || mockDashboardData;
  
  // Color constants
  const COLORS = {
    severity: {
      Critical: '#ef4444', // red
      High: '#f97316',     // orange
      Medium: '#facc15',   // yellow
      Low: '#84cc16',      // lime
    },
    legislation: {
      Law: '#3b82f6',      // blue
      Bill: '#f97316',     // orange
      Regulation: '#8b5cf6', // purple
      Framework: '#10b981', // emerald
    },
    status: {
      Enacted: '#22c55e',  // green
      Proposed: '#f97316', // orange
      'Under Review': '#6366f1', // indigo
    },
    regions: {
      'East Africa': '#3b82f6', // blue
      'West Africa': '#8b5cf6', // purple
      'North Africa': '#ec4899', // pink
      'Southern Africa': '#10b981', // emerald
      'Central Africa': '#f59e0b', // amber
    }
  };
  
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Incidents</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{displayData.counts.incidents}</h3>
            </div>
            <div className="p-3 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/incidents" 
              className="text-sm text-red-600 hover:text-red-800 inline-flex items-center"
            >
              View all incidents
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Legislation</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{displayData.counts.legislation}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/legislation" 
              className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center"
            >
              View all legislation
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Open Consultations</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{displayData.counts.openConsultations}</h3>
            </div>
            <div className="p-3 bg-purple-100 rounded-full">
              <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <Link 
              href="/consultations" 
              className="text-sm text-purple-600 hover:text-purple-800 inline-flex items-center"
            >
              View all consultations
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Incidents by Severity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Incidents by Severity</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={displayData.distribution.incidentsBySeverity}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Incidents" fill="#ef4444">
                  {displayData.distribution.incidentsBySeverity.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS.severity[entry.severity] || '#ef4444'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Legislation by Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Legislation by Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayData.distribution.legislationByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }: any) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                >
                  {displayData.distribution.legislationByStatus.map((entry: any, index: number) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.status[entry.status] || '#3b82f6'} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {displayData.recentActivity && displayData.recentActivity.slice(0, 5).map((activity: any, index: number) => (
            <div key={index} className="flex items-start">
              <div className={`p-2 rounded-full mr-3 ${
                activity.type === 'incident' ? 'bg-red-100' :
                activity.type === 'legislation' ? 'bg-blue-100' :
                'bg-purple-100'
              }`}>
                {activity.type === 'incident' ? (
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ) : activity.type === 'legislation' ? (
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium">{activity.title}</p>
                <div className="flex mt-1 text-xs text-gray-500">
                  <span className="capitalize">{activity.type}</span>
                  {activity.type === 'incident' && activity.severity && (
                    <>
                      <span className="mx-1">•</span>
                      <span className={`px-1.5 py-0.5 rounded-full ${
                        activity.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                        activity.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                        activity.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {activity.severity}
                      </span>
                    </>
                  )}
                  {activity.status && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{activity.status}</span>
                    </>
                  )}
                  {activity.updatedAt && (
                    <>
                      <span className="mx-1">•</span>
                      <span>{new Date(activity.updatedAt).toLocaleDateString()}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}