// app/legislation/page.tsx
import LegislativeTracker from '@/components/legislation/LegislativeTracker';
import Link from 'next/link';

export const metadata = {
  title: 'Legislative Tracker - AI Policy Platform',
  description: 'Track AI bills, laws, and regulations across African nations with our comprehensive legislative database and comparison tools',
};

export default function LegislationPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Legislative Tracker</h1>
          <p className="text-gray-600">Comprehensive tracking of AI bills, laws, and frameworks across Africa</p>
        </div>
        
        <div className="flex space-x-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Dashboard
          </Link>
          <button
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit New Legislation
          </button>
        </div>
      </div>
      
      <LegislativeTracker />
      
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">African AI Policy Landscape</h2>
        <p className="text-gray-700 mb-6">
          The African continent is experiencing a rapid growth in AI policy development, with countries taking diverse approaches based on their unique contexts, priorities, and existing legal frameworks.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">Regional Leadership</h3>
            <p className="text-gray-700 mb-3">
              Several African countries have emerged as regional leaders in AI policy development:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><span className="font-medium">Rwanda</span> - Comprehensive AI governance framework with clear ethical principles</li>
              <li><span className="font-medium">South Africa</span> - Sector-specific regulations focusing on financial services and healthcare</li>
              <li><span className="font-medium">Kenya</span> - Strong focus on data protection as foundation for AI governance</li>
              <li><span className="font-medium">Nigeria</span> - Emphasis on innovation-friendly frameworks that promote AI adoption</li>
              <li><span className="font-medium">Egypt</span> - National AI strategy with detailed implementation roadmap</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">Common Policy Elements</h3>
            <p className="text-gray-700 mb-3">
              Despite differences in approach, several common elements appear across African AI policies:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><span className="font-medium">Data Protection</span> - Strong emphasis on data governance as foundation for AI regulation</li>
              <li><span className="font-medium">Human Oversight</span> - Requirements for meaningful human control of AI systems</li>
              <li><span className="font-medium">Transparency</span> - Disclosure requirements for automated decision-making</li>
              <li><span className="font-medium">Fairness</span> - Provisions against algorithmic discrimination and bias</li>
              <li><span className="font-medium">Capacity Building</span> - Investment in skills development and education</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow col-span-1">
          <h2 className="text-xl font-bold mb-4">Policy Models</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4 py-1">
              <h3 className="font-medium">Comprehensive AI Laws</h3>
              <p className="text-sm text-gray-600 mt-1">
                Integrated legal frameworks specifically addressing AI systems and applications.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4 py-1">
              <h3 className="font-medium">Ethical Guidelines</h3>
              <p className="text-sm text-gray-600 mt-1">
                Non-binding principles and standards for responsible AI development and use.
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4 py-1">
              <h3 className="font-medium">Sectoral Regulations</h3>
              <p className="text-sm text-gray-600 mt-1">
                Domain-specific rules for AI use in healthcare, finance, transportation, etc.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4 py-1">
              <h3 className="font-medium">Risk-Based Frameworks</h3>
              <p className="text-sm text-gray-600 mt-1">
                Tiered regulatory approaches based on AI system risk levels and potential impacts.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4 py-1">
              <h3 className="font-medium">Rights-Based Approaches</h3>
              <p className="text-sm text-gray-600 mt-1">
                Frameworks centered on protecting fundamental rights and freedoms from AI impacts.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
          <h2 className="text-xl font-bold mb-4">Policy Development Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Policy Frameworks</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    African Union AI Strategy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    NIST AI Risk Management Framework
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    OECD AI Principles
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    UNESCO Recommendation on AI Ethics
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Model Legislation</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Model AI Governance Framework
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Template for AI Impact Assessments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Draft Healthcare AI Regulations
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Public Sector Algorithm Guidelines
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Policy Analysis Tools</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Policy Comparative Analysis Toolkit
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Gap Analysis Framework
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="border p-4 rounded-lg">
              <h3 className="font-medium text-lg mb-2">Training Materials</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Governance for Policymakers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Risk Assessment Workshop Materials
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:pr-8">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Legislative Drafting Assistance</h2>
            <p className="text-gray-700 mb-4">
              Our team provides technical assistance to policymakers and legislative drafters working on AI governance frameworks.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Expert consultation on AI technical concepts</li>
              <li>Review of draft legislation and policy documents</li>
              <li>Comparative analysis with international best practices</li>
              <li>Stakeholder engagement facilitation</li>
              <li>Impact assessment support</li>
            </ul>
          </div>
          <div className="md:w-1/3 text-center mt-4 md:mt-0">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700">
              Request Assistance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}