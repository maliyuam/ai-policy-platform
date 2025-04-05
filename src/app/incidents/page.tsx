// app/incidents/page.tsx
import IncidentsRepository from '@/components/incidents/IncidentsRepository';
import Link from 'next/link';

export const metadata = {
  title: 'AI Incidents Repository',
  description: 'Track AI incidents across Africa categorized by severity, region, and AI system type',
};

export default function IncidentsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Incidents Repository</h1>
          <p className="text-gray-600">Tracking and analyzing AI incidents across Africa</p>
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
            Report New Incident
          </button>
        </div>
      </div>
      
      <IncidentsRepository />
      
      <div className="mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">About the NIST AI Risk Management Framework Alignment</h2>
        <p className="text-gray-700 mb-4">
          This repository is aligned with the NIST AI Risk Management Framework (AI RMF), which provides a structured approach for managing risks related to AI systems. The framework helps organizations develop, deploy, evaluate, and govern trustworthy and responsible AI systems.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">NIST AI RMF Functions</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li><span className="font-medium">Govern:</span> Cultivate a culture of risk management</li>
              <li><span className="font-medium">Map:</span> Identify and assess context-specific AI risks</li>
              <li><span className="font-medium">Measure:</span> Analyze and track AI risks and impacts</li>
              <li><span className="font-medium">Manage:</span> Prioritize and respond to risks</li>
            </ul>
          </div>
          
          <div className="border rounded-lg p-4">
            <h3 className="font-medium text-lg mb-2">How We Apply the Framework</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              <li>Standardized incident categorization based on NIST taxonomy</li>
              <li>Contributing factors analysis mapped to AI RMF risk categories</li>
              <li>Severity classifications aligned with framework impact assessments</li>
              <li>Mitigation strategies based on NIST RMF best practices</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}