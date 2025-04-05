// components/incidents/IncidentsRepository.tsx
'use client';

import { useState, useEffect } from 'react';
import { Incident, ContributingFactor, TimelineEvent } from '@prisma/client';
import Link from 'next/link';

// Types for the component
type IncidentWithRelations = Incident & {
  contributingFactors: ContributingFactor[];
  timeline: TimelineEvent[];
};

type FilterOptions = {
  severity: string;
  region: string;
  aiSystemType: string;
};

// Main component
export default function IncidentsRepository() {
  const [incidents, setIncidents] = useState<IncidentWithRelations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<IncidentWithRelations | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    severity: '',
    region: '',
    aiSystemType: ''
  });
  
  // Available filter options (would come from API in a full implementation)
  const severityOptions = ['Low', 'Medium', 'High', 'Critical'];
  const regionOptions = ['East Africa', 'West Africa', 'North Africa', 'Southern Africa', 'Central Africa'];
  const aiSystemTypeOptions = ['Facial Recognition', 'Financial Services AI', 'Healthcare Diagnostic AI', 'Autonomous Systems', 'Other'];
  
  // Fetch incidents
  useEffect(() => {
    const fetchIncidents = async () => {
      setLoading(true);
      try {
        let url = '/api/incidents?';
        if (filters.severity) url += `severity=${filters.severity}&`;
        if (filters.region) url += `region=${filters.region}&`;
        if (filters.aiSystemType) url += `aiSystemType=${filters.aiSystemType}&`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch incidents');
        
        const data = await response.json();
        setIncidents(data);
        
        // Set the first incident as selected by default if available
        if (data.length > 0 && !selectedIncident) {
          setSelectedIncident(data[0]);
        }
      } catch (err) {
        setError('Failed to load incidents. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchIncidents();
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Render loading state
  if (loading && incidents.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error && incidents.length === 0) {
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
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-gray-800">AI Incidents Repository</h2>
        <p className="text-gray-600">Documented AI incidents across Africa</p>
      </div>
      
      {/* Filters */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.severity}
              onChange={(e) => handleFilterChange('severity', e.target.value)}
            >
              <option value="">All Severities</option>
              {severityOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="">All Regions</option>
              {regionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">AI System Type</label>
            <select
              className="block w-full p-2 border border-gray-300 rounded-md"
              value={filters.aiSystemType}
              onChange={(e) => handleFilterChange('aiSystemType', e.target.value)}
            >
              <option value="">All System Types</option>
              {aiSystemTypeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Main content - split view */}
      <div className="grid grid-cols-1 md:grid-cols-3">
        {/* Incident list */}
        <div className="p-4 border-r md:col-span-1 h-[600px] overflow-y-auto">
          <h3 className="text-lg font-medium mb-4">Incidents ({incidents.length})</h3>
          
          {incidents.length === 0 ? (
            <p className="text-gray-500">No incidents found matching the selected filters.</p>
          ) : (
            <ul className="space-y-2">
              {incidents.map(incident => (
                <li 
                  key={incident.id}
                  className={`p-3 rounded-md cursor-pointer transition-colors ${
                    selectedIncident?.id === incident.id 
                      ? 'bg-blue-100 border-blue-300 border'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedIncident(incident)}
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{incident.title}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      incident.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                      incident.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                      incident.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {incident.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(incident.date).toLocaleDateString()} · {incident.region}
                  </p>
                  <p className="text-xs mt-1 text-gray-500">{incident.aiSystemType}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        {/* Incident details */}
        <div className="p-6 md:col-span-2 h-[600px] overflow-y-auto">
          {selectedIncident ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-bold">{selectedIncident.title}</h2>
                <span className={`text-sm px-3 py-1 rounded-full ${
                  selectedIncident.status === 'Resolved' ? 'bg-green-100 text-green-800' :
                  selectedIncident.status === 'Ongoing' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {selectedIncident.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">
                    {new Date(selectedIncident.date).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">Region/Country</p>
                  <p className="font-medium">
                    {selectedIncident.region}
                    {selectedIncident.country && ` / ${selectedIncident.country}`}
                  </p>
                </div>
                
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-sm text-gray-500">AI System Type</p>
                  <p className="font-medium">{selectedIncident.aiSystemType}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Description</h3>
                <p className="text-gray-700">{selectedIncident.description}</p>
              </div>
              
              {selectedIncident.impactDescription && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Impact</h3>
                  <p className="text-gray-700">{selectedIncident.impactDescription}</p>
                </div>
              )}
              
              {/* Contributing Factors */}
              {selectedIncident.contributingFactors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Contributing Factors</h3>
                  <div className="space-y-3">
                    {selectedIncident.contributingFactors.map(factor => (
                      <div key={factor.id} className="bg-yellow-50 p-3 rounded-md border border-yellow-100">
                        <h4 className="font-medium text-yellow-800">{factor.name}</h4>
                        <p className="text-sm text-gray-700">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Timeline */}
              {selectedIncident.timeline.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Incident Timeline</h3>
                  <div className="relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                    <div className="space-y-4 ml-10">
                      {selectedIncident.timeline.map((event, index) => (
                        <div key={event.id} className="relative">
                          <div className="absolute -left-10 mt-1.5 w-4 h-4 rounded-full bg-blue-500"></div>
                          <div>
                            <p className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Source link */}
              {selectedIncident.sourceUrl && (
                <div className="mt-6">
                  <a 
                    href={selectedIncident.sourceUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Source
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p>Select an incident to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}