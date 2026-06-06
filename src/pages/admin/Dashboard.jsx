import { useEffect, useState } from 'react';
import { getDashboard } from '../../services/adminService';
import { timeAgo } from '../../utils/formatDate';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard().then(({ data }) => setStats(data.data));
  }, []);

  if (!stats) {
    return <div className="text-gray-500">Loading dashboard...</div>;
  }

  const cards = [
    { label: 'Total Jobs', value: stats.totalJobs, color: 'bg-blue-500' },
    { label: 'Total Internships', value: stats.totalInternships, color: 'bg-purple-500' },
    { label: 'Total Hackathons', value: stats.totalHackathons, color: 'bg-orange-500' },
    { label: 'Total Subscribers', value: stats.totalSubscribers, color: 'bg-green-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className={`w-10 h-10 ${card.color} rounded-xl mb-3`} />
            <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats.recentActivity?.length === 0 && (
            <p className="text-gray-500 text-sm">No recent activity</p>
          )}
          {stats.recentActivity?.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.subtitle} · {item.type}</p>
              </div>
              <div className="text-right">
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'published' ? 'bg-green-100 text-green-700' : item.status === 'draft' ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-700'}`}>
                  {item.status}
                </span>
                <p className="text-xs text-gray-400 mt-1">{timeAgo(item.createdAt)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
