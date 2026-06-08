import { useEffect, useState } from 'react';
import { getDashboard } from '../../services/adminService';
import { timeAgo } from '../../utils/formatDate';

const ACTION_LABELS = {
  job: 'Job', internship: 'Internship', hackathon: 'Hackathon',
  government: 'Gov Job', subscriber: 'Subscriber', announcement: 'Announcement',
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboard().then(({ data }) => setStats(data.data));
  }, []);

  if (!stats) return <div className="text-gray-500">Loading dashboard...</div>;

  const cards = [
    { label: 'Total Jobs', value: stats.totalJobs, color: 'bg-blue-500' },
    { label: 'Total Internships', value: stats.totalInternships, color: 'bg-purple-500' },
    { label: 'Total Hackathons', value: stats.totalHackathons, color: 'bg-orange-500' },
    { label: 'Government Jobs', value: stats.totalGovernmentJobs, color: 'bg-teal-500' },
    { label: 'Subscribers', value: stats.totalSubscribers, color: 'bg-green-500' },
    { label: 'Total Visitors', value: stats.totalVisitors, color: 'bg-indigo-500' },
    { label: "Today's Visitors", value: stats.todayVisitors, color: 'bg-pink-500' },
    { label: 'Unique Visitors', value: stats.uniqueVisitors, color: 'bg-amber-500' },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 ${card.color} rounded-xl mb-2 sm:mb-3`} />
            <p className="text-lg sm:text-2xl font-bold text-gray-900">{card.value}</p>
            <p className="text-xs sm:text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {stats.recentActivity?.length === 0 && <p className="text-gray-500 text-sm">No recent activity</p>}
          {stats.recentActivity?.map((item, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2 border-b border-gray-50 last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{item.title}</p>
                <p className="text-xs text-gray-500">
                  {ACTION_LABELS[item.type] || item.type} {item.action} · {item.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs px-2 py-1 rounded-full ${item.status === 'published' || item.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {item.status}
                </span>
                <span className="text-xs text-gray-400">{timeAgo(item.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
