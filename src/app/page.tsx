// app/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'AI Policy Platform - African AI Governance Hub',
  description: 'A comprehensive platform for tracking AI incidents, legislation, and policy consultations across Africa',
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">African AI Policy Platform</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Comprehensive tracking and analysis of AI incidents, legislation, and policy consultations across Africa.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <Link 
                href="/dashboard" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-8"
              >
                Explore Dashboard
              </Link>
              <Link 
                href="/about" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700 md:py-4 md:text-lg md:px-8"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 uppercase tracking-wide">Comprehensive Tools</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-5xl">
              Monitor, Track, and Shape AI Governance
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our platform provides policymakers, researchers, and citizens with powerful tools to understand and influence AI governance across Africa.
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">AI Incidents Repository</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Track and analyze AI incidents across Africa, categorized by severity, region, and AI system type. Aligned with the NIST AI Risk Management Framework.
                    </p>
                    <div className="mt-6">
                      <Link 
                        href="/incidents" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Explore Incidents
                        <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Legislative Tracker</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Monitor AI bills, laws, and regulations across African nations. Compare policies across jurisdictions and track adoption through our interactive map.
                    </p>
                    <div className="mt-6">
                      <Link 
                        href="/legislation" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        View Legislation
                        <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Policy Consultation Hub</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Participate in shaping AI policies through structured public comments and expert discussions. Organized by policy domain and geographic relevance.
                    </p>
                    <div className="mt-6">
                      <Link 
                        href="/consultations" 
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        Join Consultations
                        <svg className="ml-1 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Platform Statistics</h2>
            <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
              Our growing database provides comprehensive coverage of AI governance across Africa.
            </p>
          </div>
          
          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="text-5xl font-extrabold text-blue-600">27</div>
                  <div className="mt-1 text-xl font-medium text-gray-900">AI Incidents</div>
                  <div className="mt-1 text-sm text-gray-500">Documented and analyzed</div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="text-5xl font-extrabold text-blue-600">21</div>
                  <div className="mt-1 text-xl font-medium text-gray-900">AI Policies</div>
                  <div className="mt-1 text-sm text-gray-500">Laws, bills, and frameworks</div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="text-5xl font-extrabold text-blue-600">17</div>
                  <div className="mt-1 text-xl font-medium text-gray-900">Open Consultations</div>
                  <div className="mt-1 text-sm text-gray-500">Active policy discussions</div>
                </div>
              </div>
              
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6 text-center">
                  <div className="text-5xl font-extrabold text-blue-600">14</div>
                  <div className="mt-1 text-xl font-medium text-gray-900">Countries</div>
                  <div className="mt-1 text-sm text-gray-500">With active governance</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to explore AI governance?</span>
            <span className="block text-blue-200">Start using the platform today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Get started
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-700"
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}