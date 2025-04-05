// app/dashboard/page.tsx
import AnalyticsDashboard from '@/components/dashboard/AnalyticsDashboard';

export const metadata = {
  title: 'Analytics Dashboard - AI Policy Platform',
  description: 'Visual representation of policy trends and emerging regulatory patterns in AI governance across Africa',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-600">Monitor AI policy trends and emerging regulatory patterns across Africa</p>
      </div>
      
      <AnalyticsDashboard />
    </div>
  );
}