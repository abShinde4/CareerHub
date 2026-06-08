import { useEffect, useState } from 'react';
import { getAnalytics } from '../../services/analyticsService';

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
      <div className={`w-8 h-8 ${color} rounded-lg mb-2`} />
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value?.toLocaleString?.() ?? value}</p>
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    </div>
  );
}

function BarChart({ data, labelKey, valueKey, maxHeight = 120 }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1);
  return (
    <div className="flex items-end gap-1 sm:gap-2 h-32 sm:h-40">
      {data.map((d) => (
        <div key={d[labelKey]} className="flex-1 flex flex-col items-center gap-1 min-w-0">
          <div
            className="w-full bg-primary-500 rounded-t-md min-h-[4px] transition-all"
            style={{ height: `${(d[valueKey] / max) * maxHeight}px` }}
          />
          <span className="text-[9px] sm:text-xs text-gray-500 truncate w-full text-center">{d[labelKey]}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getAnalytics().then(({ data: res }) => setData(res.data));
  }, []);

  if (!data) return <div className="text-gray-500">Loading analytics...</div>;

  const cards = [
    { label: 'Total Visitors', value: data.totalVisitors, color: 'bg-blue-500' },
    { label: "Today's Visitors", value: data.todayVisitors, color: 'bg-green-500' },
    { label: 'Weekly Visitors', value: data.weeklyVisitors, color: 'bg-purple-500' },
    { label: 'Monthly Visitors', value: data.monthlyVisitors, color: 'bg-orange-500' },
    { label: 'Unique Visitors', value: data.uniqueVisitors, color: 'bg-pink-500' },
  ];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
        {cards.map((c) => <StatCard key={c.label} {...c} />)}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Daily Visits (7 days)</h2>
          <BarChart data={data.dailyVisits.map((d) => ({ date: d.date.slice(5), count: d.count }))} labelKey="date" valueKey="count" />
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100">
          <h2 className="font-bold text-gray-900 mb-4">Device Types</h2>
          <BarChart data={data.deviceStats.map((d) => ({ device: d.device, count: d.count }))} labelKey="device" valueKey="count" />
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 lg:col-span-2">
          <h2 className="font-bold text-gray-900 mb-4">Most Visited Pages</h2>
          <div className="space-y-2">
            {data.topPages.map((p) => (
              <div key={p.page} className="flex justify-between items-center py-2 border-b border-gray-50 text-sm">
                <span className="text-gray-700 truncate mr-4">{p.page}</span>
                <span className="font-semibold text-primary-600 shrink-0">{p.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 lg:col-span-2">
          <h2 className="font-bold text-gray-900 mb-4">Visitor Countries</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {data.countryStats.map((c) => (
              <div key={c.country} className="flex justify-between py-2 px-3 bg-gray-50 rounded-xl text-sm">
                <span>{c.country}</span>
                <span className="font-semibold">{c.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
