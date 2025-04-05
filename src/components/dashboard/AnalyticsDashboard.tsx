// components/dashboard/AnalyticsDashboard.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import Link from 'next/link';

// Types
type DashboardData = {
  counts: {
    incidents: number;
    legislation: number;
    openConsultations: number;
  };
  distribution: {
    incidentsBySeverity: Array<{severity: string; count: number}>;
    incidentsByRegion: Array<{region: string; count: number}>;
    legislationByType: Array<{type: string; count: number}>;
    legislationByStatus: Array<{status: string; count: number}>;
    legislationByRegion: Array<{region: string; count: number}>;
    consultationsByDomain: Array<{domain: string; count: number}>;
    consultationsByStatus: Array<{status: string; count: number}>;
    consultationsByRegion: Array<{region: string; count: number}>;
  };
  recentActivity: Array<{
    id: string;
    title: string;
    type: 'incident' | 'legislation' | 'consultation';
    updatedAt: string;
    [key: string]: any;
  }>;
  upcomingConsultations: Array<{
    id: string;
    title: string;
    endDate: string;
    domain: string;
    region: string;
  }>;
};

// Color constants
const COLORS = {
  incidents: {
    primary: '#ef4444', // red-500
    background: '#fee2e2', // red-100
    text: '#b91c1c', // red-700
    Critical: '#ef4444', // red-500
    High: '#f97316', // orange-500
    Medium: '#facc15', // yellow-500
    Low: '#84cc16', // lime-500
  },
  legislation: {
    primary: '#3b82f6', // blue-500
    background: '#dbeafe', // blue-100
    text: '#1d4ed8', // blue-700
    Enacted: '#22c55e', // green-500
    Proposed: '#f97316', // orange-500
    'Under Review': '#6366f1', // indigo-500
  },
  consultations: {
    primary: '#8b5cf6', // purple-500
    background: '#ede9fe', // purple-100
    text: '#6d28d9', // purple-700
    Open: '#22c55e', // green-500
    Closed: '#ef4444', // red-500
    Upcoming: '#f97316', // orange-500
  },
  regions: {
    'East Africa': '#3b82f6', // blue-500
    'West Africa': '#8b5cf6', // purple-500
    'North Africa': '#ec4899', // pink-500
    'Southern Africa': '#10b981', // emerald-500
    'Central Africa': '#f59e0b', // amber-500
  }
};

// Main component
export default function AnalyticsDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState<'all' | '6m' | '3m' | '1m'>('all');
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/dashboard');
        if (!response.ok) throw new Error('Failed to fetch dashboard data');
        
        const dashboardData = await response.json();
        setData(dashboardData);
      } catch (err) {
        setError('Failed to load dashboard data. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Render loading state
  if (loading && !data) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error && !data) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <p className="text-red-700">{error}</p>
        <button 
          className="mt-2 text-sm text-red-600 hover:text-red-800"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }
  
  // Render dashboard with data
  if (!data) return null;
  
  return (
    <div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 border-red-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Incidents</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{data.counts.incidents}</h3>
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
        
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 border-blue-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Total Legislation</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{data.counts.legislation}</h3>
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
        
        <div className={`bg-white rounded-lg shadow p-6 border-l-4 border-purple-500`}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Open Consultations</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{data.counts.openConsultations}</h3>
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
                data={data.distribution.incidentsBySeverity}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="severity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Incidents" fill="#ef4444">
                  {data.distribution.incidentsBySeverity.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS.incidents[entry.severity as keyof typeof COLORS.incidents] || COLORS.incidents.primary} />
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
                  data={data.distribution.legislationByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="status"
                >
                  {data.distribution.legislationByStatus.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS.legislation[entry.status as keyof typeof COLORS.legislation] || COLORS.legislation.primary} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Distribution by Region */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Distribution by Region</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.keys(COLORS.regions).map(region => {
                  const incidents = data.distribution.incidentsByRegion.find(item => item.region === region)?.count || 0;
                  const legislation = data.distribution.legislationByRegion.find(item => item.region === region)?.count || 0;
                  const consultations = data.distribution.consultationsByRegion.find(item => item.region === region)?.count || 0;
                  
                  return {
                    region,
                    incidents,
                    legislation,
                    consultations
                  };
                })}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incidents" name="Incidents" fill={COLORS.incidents.primary} />
                <Bar dataKey="legislation" name="Legislation" fill={COLORS.legislation.primary} />
                <Bar dataKey="consultations" name="Consultations" fill={COLORS.consultations.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Consultations by Domain */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-4">Consultations by Domain</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={data.distribution.consultationsByDomain}
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="domain" />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Consultations" fill={COLORS.consultations.primary} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow lg:col-span-2">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Recent Activity</h3>
          </div>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {data.recentActivity.slice(0, 7).map((activity) => (
                <li key={`${activity.type}-${activity.id}`} className="py-4">
                  <div className="flex items-start">
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
                      <Link 
                        href={`/${activity.type}s/${activity.id}`}
                        className="text-sm font-medium hover:text-blue-600"
                      >
                        {activity.title}
                      </Link>
                      <div className="flex mt-1 text-xs text-gray-500">
                        <span className="capitalize">{activity.type}</span>
                        {activity.type === 'incident' && (
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
                        {activity.type === 'legislation' && (
                          <>
                            <span className="mx-1">•</span>
                            <span className={`px-1.5 py-0.5 rounded-full ${
                              activity.status === 'Enacted' ? 'bg-green-100 text-green-800' :
                              activity.status === 'Proposed' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-blue-100 text-blue-800'
                            }`}>
                              {activity.status}
                            </span>
                          </>
                        )}
                        {activity.type === 'consultation' && (
                          <>
                            <span className="mx-1">•</span>
                            <span className={`px-1.5 py-0.5 rounded-full ${
                              activity.status === 'Open' ? 'bg-green-100 text-green-800' :
                              activity.status === 'Closed' ? 'bg-red-100 text-red-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.status}
                            </span>
                          </>
                        )}
                        <span className="mx-1">•</span>
                        <span>{new Date(activity.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center">
                View all activity
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Upcoming Deadlines */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b">
            <h3 className="text-lg font-medium">Upcoming Consultation Deadlines</h3>
          </div>
          <div className="p-6">
            {data.upcomingConsultations.length === 0 ? (
              <p className="text-gray-500 text-center py-6">No upcoming deadlines</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {data.upcomingConsultations.map(consultation => {
                  const daysRemaining = Math.ceil((new Date(consultation.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  
                  return (
                    <li key={consultation.id} className="py-4">
                      <Link 
                        href={`/consultations/${consultation.id}`}
                        className="text-sm font-medium hover:text-blue-600"
                      >
                        {consultation.title}
                      </Link>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">{consultation.domain}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          daysRemaining <= 3 ? 'bg-red-100 text-red-800' :
                          daysRemaining <= 7 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {daysRemaining} days left
                        </span>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        Closes: {new Date(consultation.endDate).toLocaleDateString()}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
      
      {/* Custom Report Section */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Generate Custom Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option>Policy Impact Assessment</option>
              <option>Regulatory Gap Analysis</option>
              <option>Regional Compliance Overview</option>
              <option>AI Incident Trend Analysis</option>
              <option>Custom Report</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region Focus</label>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option>All Regions</option>
              <option>East Africa</option>
              <option>West Africa</option>
              <option>North Africa</option>
              <option>Southern Africa</option>
              <option>Central Africa</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
            <select className="block w-full p-2 border border-gray-300 rounded-md">
              <option>PDF Report</option>
              <option>Excel Spreadsheet</option>
              <option>CSV Data</option>
              <option>Interactive Dashboard</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}