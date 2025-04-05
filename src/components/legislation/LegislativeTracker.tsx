// components/legislation/LegislativeTracker.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Types for the component
type Category = {
  id: string;
  name: string;
};

type CategoryRelation = {
  categoryId: string;
  category: Category;
};

type ConsultationPreview = {
  id: string;
  title: string;
  endDate: Date;
};

type Legislation = {
  id: string;
  title: string;
  type: string;
  status: string;
  jurisdiction: string;
  region: string;
  description: string;
  content: string | null;
  dateProposed: Date | null;
  dateEnacted: Date | null;
  sourceUrl: string | null;
  categories: CategoryRelation[];
  consultations: ConsultationPreview[];
};

type FilterOptions = {
  type: string;
  status: string;
  region: string;
  categoryId: string;
};

// Map component to display policy adoption
const PolicyMap = () => {
  // This would be a more sophisticated map in a real implementation
  // For the MVP, we'll use a simple representation of Africa regions
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Policy Adoption Map</h3>
      
      <div className="relative w-full h-96 border rounded-lg overflow-hidden">
        {/* Simple color-coded map of Africa regions */}
        <svg viewBox="0 0 1000 1000" className="w-full h-full">
          {/* North Africa - Medium adoption */}
          <path d="M200,200 L800,200 L700,350 L300,350 Z" fill="#9DC3E6" />
          
          {/* West Africa - High adoption */}
          <path d="M300,350 L450,350 L500,550 L300,500 Z" fill="#4472C4" />
          
          {/* Central Africa - Low adoption */}
          <path d="M450,350 L700,350 L650,550 L500,550 Z" fill="#D9E1F2" />
          
          {/* East Africa - Medium adoption */}
          <path d="M650,550 L700,350 L800,500 L700,600 Z" fill="#9DC3E6" />
          
          {/* Southern Africa - High adoption */}
          <path d="M300,500 L500,550 L650,550 L700,600 L550,800 L400,800 Z" fill="#4472C4" />
          
          {/* Labels */}
          <text x="500" y="275" textAnchor="middle" fill="#333" fontSize="20">North Africa</text>
          <text x="375" y="450" textAnchor="middle" fill="#fff" fontSize="20">West Africa</text>
          <text x="575" y="450" textAnchor="middle" fill="#333" fontSize="20">Central Africa</text>
          <text x="700" y="500" textAnchor="middle" fill="#333" fontSize="20">East Africa</text>
          <text x="500" y="650" textAnchor="middle" fill="#fff" fontSize="20">Southern Africa</text>
        </svg>
        
        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-2 rounded shadow">
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 bg-[#4472C4] mr-2"></div>
            <span className="text-xs">High Adoption</span>
          </div>
          <div className="flex items-center mb-1">
            <div className="w-4 h-4 bg-[#9DC3E6] mr-2"></div>
            <span className="text-xs">Medium Adoption</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-[#D9E1F2] mr-2"></div>
            <span className="text-xs">Low Adoption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Comparison tool component
const ComparisonTool = ({ legislation }: { legislation: Legislation[] }) => {
  const [selectedLaws, setSelectedLaws] = useState<string[]>([]);
  
  const handleToggleSelection = (id: string) => {
    if (selectedLaws.includes(id)) {
      setSelectedLaws(selectedLaws.filter(lawId => lawId !== id));
    } else {
      if (selectedLaws.length < 2) {
        setSelectedLaws([...selectedLaws, id]);
      }
    }
  };
  
  const selectedLegislation = legislation.filter(law => selectedLaws.includes(law.id));
  
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-6">
      <h3 className="text-lg font-medium mb-4">Policy Comparison Tool</h3>
      <p className="text-gray-600 mb-4">Select up to 2 policies to compare side-by-side</p>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-500 mb-2">Select Policies:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {legislation.slice(0, 6).map(law => (
            <div 
              key={law.id}
              className={`p-3 border rounded-md cursor-pointer transition-colors ${
                selectedLaws.includes(law.id) 
                  ? 'bg-blue-50 border-blue-300' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleToggleSelection(law.id)}
            >
              <div className="flex justify-between">
                <h5 className="font-medium">{law.title}</h5>
                {selectedLaws.includes(law.id) && (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-500">{law.jurisdiction}</span>
                <span className="text-gray-500">{law.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedLegislation.length > 0 && (
        <div className="mt-6 border-t pt-4">
          <h4 className="text-sm font-medium text-gray-500 mb-4">Comparison Results:</h4>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feature</th>
                  {selectedLegislation.map(law => (
                    <th key={law.id} className="px-3 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {law.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Jurisdiction</td>
                  {selectedLegislation.map(law => (
                    <td key={law.id} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.jurisdiction}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Status</td>
                  {selectedLegislation.map(law => (
                    <td key={law.id} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.status}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Type</td>
                  {selectedLegislation.map(law => (
                    <td key={law.id} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.type}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Date Enacted</td>
                  {selectedLegislation.map(law => (
                    <td key={law.id} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.dateEnacted ? new Date(law.dateEnacted).toLocaleDateString() : 'N/A'}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Categories</td>
                  {selectedLegislation.map(law => (
                    <td key={law.id} className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {law.categories.map(c => c.category.name).join(', ')}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
              Generate Full Comparison Report
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Main component for the Legislative Tracker
export default function LegislativeTracker() {
  const [legislation, setLegislation] = useState<Legislation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLegislation, setSelectedLegislation] = useState<Legislation | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({
    type: '',
    status: '',
    region: '',
    categoryId: ''
  });
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Available filter options (would come from API in a full implementation)
  const typeOptions = ['Law', 'Bill', 'Regulation', 'Framework'];
  const statusOptions = ['Enacted', 'Proposed', 'Under Review'];
  const regionOptions = ['East Africa', 'West Africa', 'North Africa', 'Southern Africa', 'Central Africa'];
  
  // Fetch legislation and categories
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch legislation
        let url = '/api/legislation?';
        if (filters.type) url += `type=${filters.type}&`;
        if (filters.status) url += `status=${filters.status}&`;
        if (filters.region) url += `region=${filters.region}&`;
        if (filters.categoryId) url += `categoryId=${filters.categoryId}&`;
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch legislation');
        
        const data = await response.json();
        setLegislation(data);
        
        // Set the first legislation as selected by default if available
        if (data.length > 0 && !selectedLegislation) {
          setSelectedLegislation(data[0]);
        }
        
        // Fetch categories (in a real implementation, this would be a separate endpoint)
        const categoriesResponse = await fetch('/api/categories');
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories');
        
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error(err);
        
        // For the MVP, simulate categories since we don't have a real endpoint
        setCategories([
          { id: 'cat1', name: 'Data Privacy' },
          { id: 'cat2', name: 'Algorithmic Bias' },
          { id: 'cat3', name: 'Facial Recognition' },
          { id: 'cat4', name: 'Autonomous Systems' },
          { id: 'cat5', name: 'Healthcare AI' }
        ]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [filters]);
  
  // Handle filter changes
  const handleFilterChange = (filterType: keyof FilterOptions, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  // Render loading state
  if (loading && legislation.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error && legislation.length === 0) {
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
        <h2 className="text-2xl font-bold text-gray-800">Legislative Tracker</h2>
        <p className="text-gray-600">AI bills, laws, and regulations across Africa</p>
      </div>
      
      {/* View toggle and filters */}
      <div className="p-4 bg-gray-50 border-b">
        <div className="flex flex-col md:flex-row md:justify-between mb-4">
          {/* View toggle */}
          <div className="flex space-x-2 mb-4 md:mb-0">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => setViewMode('list')}
            >
              List View
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                viewMode === 'map'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
              onClick={() => setViewMode('map')}
            >
              Map View
            </button>
          </div>
          
          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              className="block p-2 text-sm border border-gray-300 rounded-md"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              {typeOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <select
              className="block p-2 text-sm border border-gray-300 rounded-md"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <select
              className="block p-2 text-sm border border-gray-300 rounded-md"
              value={filters.region}
              onChange={(e) => handleFilterChange('region', e.target.value)}
            >
              <option value="">All Regions</option>
              {regionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            
            <select
              className="block p-2 text-sm border border-gray-300 rounded-md"
              value={filters.categoryId}
              onChange={(e) => handleFilterChange('categoryId', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Main content - changes based on view mode */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Legislation list */}
          <div className="p-4 border-r md:col-span-1 h-[600px] overflow-y-auto">
            <h3 className="text-lg font-medium mb-4">Legislation ({legislation.length})</h3>
            
            {legislation.length === 0 ? (
              <p className="text-gray-500">No legislation found matching the selected filters.</p>
            ) : (
              <ul className="space-y-2">
                {legislation.map(law => (
                  <li 
                    key={law.id}
                    className={`p-3 rounded-md cursor-pointer transition-colors ${
                      selectedLegislation?.id === law.id 
                        ? 'bg-blue-100 border-blue-300 border'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => setSelectedLegislation(law)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{law.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        law.status === 'Enacted' ? 'bg-green-100 text-green-800' :
                        law.status === 'Proposed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {law.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {law.type} · {law.jurisdiction}
                    </p>
                    {law.categories.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {law.categories.map(cat => (
                          <span 
                            key={cat.categoryId}
                            className="text-xs px-2 py-0.5 bg-gray-100 rounded-full"
                          >
                            {cat.category.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Legislation details */}
          <div className="p-6 md:col-span-2 h-[600px] overflow-y-auto">
            {selectedLegislation ? (
              <div>
                <div className="mb-4">
                  <h2 className="text-xl font-bold">{selectedLegislation.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-sm px-3 py-1 rounded-full ${
                      selectedLegislation.status === 'Enacted' ? 'bg-green-100 text-green-800' :
                      selectedLegislation.status === 'Proposed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {selectedLegislation.status}
                    </span>
                    <span className="text-sm text-gray-500">{selectedLegislation.type}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{selectedLegislation.jurisdiction}, {selectedLegislation.region}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Date Proposed</p>
                    <p className="font-medium">
                      {selectedLegislation.dateProposed 
                        ? new Date(selectedLegislation.dateProposed).toLocaleDateString() 
                        : 'Not specified'}
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm text-gray-500">Date Enacted</p>
                    <p className="font-medium">
                      {selectedLegislation.dateEnacted 
                        ? new Date(selectedLegislation.dateEnacted).toLocaleDateString() 
                        : 'Not yet enacted'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-2">Description</h3>
                  <p className="text-gray-700">{selectedLegislation.description}</p>
                </div>
                
                {selectedLegislation.content && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Content Summary</h3>
                    <div className="bg-gray-50 p-4 rounded-md border text-gray-700">
                      {selectedLegislation.content}
                    </div>
                  </div>
                )}
                
                {/* Categories */}
                {selectedLegislation.categories.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedLegislation.categories.map(cat => (
                        <span 
                          key={cat.categoryId}
                          className="px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-sm"
                        >
                          {cat.category.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Related Consultations */}
                {selectedLegislation.consultations.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-2">Open Consultations</h3>
                    <div className="space-y-3">
                      {selectedLegislation.consultations.map(consultation => (
                        <div key={consultation.id} className="bg-purple-50 p-3 rounded-md border border-purple-100">
                          <h4 className="font-medium text-purple-800">{consultation.title}</h4>
                          <p className="text-sm text-gray-700 mt-1">
                            Open until: {new Date(consultation.endDate).toLocaleDateString()}
                          </p>
                          <Link 
                            href={`/consultations/${consultation.id}`}
                            className="text-sm text-purple-700 hover:text-purple-900 inline-block mt-2"
                          >
                            Participate →
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Source link */}
                {selectedLegislation.sourceUrl && (
                  <div className="mt-6">
                    <a 
                      href={selectedLegislation.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Original Document
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-500">
                <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Select legislation to view details</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-6">
          <PolicyMap />
          <ComparisonTool legislation={legislation} />
        </div>
      )}
    </div>
  );
}