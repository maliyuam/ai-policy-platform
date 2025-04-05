// app/about/page.tsx
import Link from 'next/link';

export const metadata = {
  title: 'About - AI Policy Platform',
  description: 'Learn about the AI Policy Platform and our mission to improve AI governance across Africa',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About the AI Policy Platform</h1>
        
        {/* Mission & Vision */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-lg text-gray-600 mb-6">
            The AI Policy Platform is dedicated to improving AI governance across Africa by providing 
            comprehensive data, analysis, and engagement tools for policymakers, researchers, 
            industry stakeholders, and civil society organizations.
          </p>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Our Vision</h3>
            <p className="text-gray-700">
              A future where AI technologies are developed and deployed across Africa in a manner that 
              respects human rights, promotes inclusive economic growth, and upholds democratic values.
            </p>
          </div>
        </section>
        
        {/* Platform Approach */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Approach</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Documentation</h3>
              <p className="text-gray-600">
                We meticulously collect and document AI incidents, legislation, and regulatory developments across Africa.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Analysis</h3>
              <p className="text-gray-600">
                Our platform provides actionable insights and trend analysis to inform better policy decisions.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Engagement</h3>
              <p className="text-gray-600">
                We facilitate structured participation in policy consultations from diverse stakeholders.
              </p>
            </div>
          </div>
        </section>
        
        {/* Methodology */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Methodology</h2>
          <p className="text-gray-600 mb-6">
            The AI Policy Platform uses a rigorous methodology to ensure the accuracy, comprehensiveness, and relevance of our data and analysis.
          </p>
          
          <div className="bg-white rounded-lg shadow">
            <div className="border-b">
              <button className="w-full text-left p-4 font-medium focus:outline-none">
                Data Collection
              </button>
              <div className="p-4 border-t">
                <p className="text-gray-600 mb-3">
                  Our data collection methodology includes:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Daily monitoring of government websites, official gazettes, and parliamentary proceedings</li>
                  <li>Partnerships with local legal experts in each country</li>
                  <li>Regular scraping and updates from aipolicy.africa and other authoritative sources</li>
                  <li>Verification of all information by at least two independent researchers</li>
                  <li>Clear documentation of sources and confidence levels</li>
                </ul>
              </div>
            </div>
            
            <div className="border-b">
              <button className="w-full text-left p-4 font-medium focus:outline-none">
                Analysis Framework
              </button>
              <div className="p-4 border-t">
                <p className="text-gray-600 mb-3">
                  Our analysis follows established frameworks including:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>NIST AI Risk Management Framework</li>
                  <li>OECD AI Principles</li>
                  <li>UNESCO Recommendation on the Ethics of AI</li>
                  <li>African Union Data Policy Framework</li>
                </ul>
              </div>
            </div>
            
            <div>
              <button className="w-full text-left p-4 font-medium focus:outline-none">
                Stakeholder Engagement
              </button>
              <div className="p-4 border-t">
                <p className="text-gray-600 mb-3">
                  Our consultation process ensures:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-gray-600">
                  <li>Accessibility for diverse stakeholders</li>
                  <li>Structured feedback channels</li>
                  <li>Transparent attribution and verification</li>
                  <li>Equal consideration of all perspectives</li>
                  <li>Regular summaries and analysis of feedback trends</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Team</h2>
          <p className="text-gray-600 mb-6">
            The AI Policy Platform is maintained by a diverse team of experts in AI governance, policy analysis, and digital rights.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* We would include actual team information here in a real implementation */}
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Dr. Amina Konaté</h3>
              <p className="text-sm text-gray-500">Executive Director</p>
              <p className="mt-2 text-gray-600 text-sm">
                Expert in AI ethics and governance with 15+ years of experience in tech policy.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Dr. Emmanuel Osei</h3>
              <p className="text-sm text-gray-500">Research Director</p>
              <p className="mt-2 text-gray-600 text-sm">
                Leads our research methodology and analysis frameworks.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold">Sarah Mwangi</h3>
              <p className="text-sm text-gray-500">Technology Lead</p>
              <p className="mt-2 text-gray-600 text-sm">
                Oversees the platform development and data architecture.
              </p>
            </div>
          </div>
        </section>
        
        {/* Partners */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Partners</h2>
          <p className="text-gray-600 mb-6">
            We collaborate with a wide range of organizations committed to responsible AI governance across Africa.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* We would include actual partner logos here in a real implementation */}
            <div className="h-24 bg-white rounded-lg shadow flex items-center justify-center p-4">
              <div className="text-gray-400 font-medium">Partner 1</div>
            </div>
            <div className="h-24 bg-white rounded-lg shadow flex items-center justify-center p-4">
              <div className="text-gray-400 font-medium">Partner 2</div>
            </div>
            <div className="h-24 bg-white rounded-lg shadow flex items-center justify-center p-4">
              <div className="text-gray-400 font-medium">Partner 3</div>
            </div>
            <div className="h-24 bg-white rounded-lg shadow flex items-center justify-center p-4">
              <div className="text-gray-400 font-medium">Partner 4</div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Join Us in Shaping the Future of AI Governance</h2>
          <p className="text-lg mb-6">
            Whether you're a policymaker, researcher, industry expert, or concerned citizen, 
            your voice matters in building responsible AI systems across Africa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/consultations"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md hover:bg-blue-50"
            >
              Join a Consultation
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 bg-blue-800 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}