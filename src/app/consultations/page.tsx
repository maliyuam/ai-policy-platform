// app/consultations/page.tsx
import ConsultationHub from '@/components/consultations/ConsultationHub';
import Link from 'next/link';

export const metadata = {
  title: 'Policy Consultation Hub - AI Policy Platform',
  description: 'Participate in shaping AI policies across Africa through structured public consultations and stakeholder engagement',
};

export default function ConsultationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Policy Consultation Hub</h1>
          <p className="text-gray-600">Participate in shaping AI policy development across Africa</p>
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
            Submit Policy Feedback
          </button>
        </div>
      </div>
      
      <ConsultationHub />
      
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Why Your Feedback Matters</h2>
        <p className="text-gray-700 mb-4">
          Public consultations are a vital part of the policy development process. Your input helps shape AI regulations that are effective, balanced, and responsive to the needs of all stakeholders.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">Impact on Policy</h3>
            <p className="text-gray-700">
              Public consultations have directly influenced the development of AI governance frameworks in countries like Rwanda, Kenya, and South Africa. Your voice can make a difference in how AI is regulated.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">Diverse Perspectives</h3>
            <p className="text-gray-700">
              The most effective policies incorporate insights from diverse stakeholders, including industry, academia, civil society, and the general public. Each perspective adds unique value to the policy development process.
            </p>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">Transparency & Accountability</h3>
            <p className="text-gray-700">
              Public consultations enhance transparency in the policy-making process and hold policymakers accountable to the public. All comments are documented and considered during policy development.
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-10 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-2/3 md:pr-8">
            <h2 className="text-xl font-bold text-blue-800 mb-2">Consultation Guidelines</h2>
            <p className="text-gray-700 mb-4">
              Not sure how to participate effectively in consultations? Download our comprehensive guide for providing valuable feedback that policymakers can use.
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              <li>Understanding policy consultation processes</li>
              <li>Structuring effective feedback</li>
              <li>Backing your points with evidence</li>
              <li>Addressing potential implementation challenges</li>
              <li>Tracking the impact of your input</li>
            </ul>
          </div>
          <div className="md:w-1/3 text-center mt-4 md:mt-0">
            <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 inline-flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download Guide (PDF)
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Consultation Calendar</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                  <th className="px-4 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Apr 15, 2025</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Public Forum: AI in Healthcare</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Nairobi, Kenya</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Apr 22, 2025</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Workshop: Facial Recognition Ethics</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Lagos, Nigeria</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 5, 2025</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Expert Panel: AI & Financial Inclusion</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Cape Town, South Africa</td>
                </tr>
                <tr>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">May 18, 2025</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">Virtual Roundtable: AI Governance</td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">Online</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-blue-600 hover:text-blue-800">
              View Full Calendar
            </button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Success Stories</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Rwanda's AI Ethics Framework</h3>
              <p className="text-sm text-gray-600 mt-1">
                Public consultation led to significant improvements in Rwanda's AI Ethics Framework, 
                particularly around transparency requirements and oversight mechanisms.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Kenya's Facial Recognition Guidelines</h3>
              <p className="text-sm text-gray-600 mt-1">
                Stakeholder feedback resulted in stronger privacy protections and the inclusion of 
                bias testing requirements in Kenya's facial recognition deployment guidelines.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">Nigeria's AI in Financial Services Regulations</h3>
              <p className="text-sm text-gray-600 mt-1">
                Industry and consumer advocacy input helped balance innovation with consumer 
                protection in Nigeria's AI financial services regulations.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">South Africa's Algorithmic Impact Assessment Framework</h3>
              <p className="text-sm text-gray-600 mt-1">
                Academic and civil society contributions significantly improved South Africa's 
                framework for assessing algorithmic impacts on vulnerable populations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}