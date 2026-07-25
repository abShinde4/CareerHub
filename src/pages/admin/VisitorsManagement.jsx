import { useCallback, useEffect, useState, useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { AdminPageHeader } from '../../components/admin/AdminTable';
import ResponsiveAdminTable from '../../components/admin/ResponsiveAdminTable';
import { getVisitors } from '../../services/namedVisitorService';
import { formatDate } from '../../utils/formatDate';

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
      <div className={`w-8 h-8 ${color} rounded-lg mb-2`} />
      <p className="text-xl sm:text-2xl font-bold text-gray-900">{value?.toLocaleString?.() ?? value}</p>
      <p className="text-xs sm:text-sm text-gray-500">{label}</p>
    </div>
  );
}

const columns = [
  { key: 'name', label: 'Name' },
  {
    key: 'visitorId',
    label: 'Visitor ID',
    render: (row) => (
      <span className="font-mono text-xs text-gray-600 break-all">{row.visitorId}</span>
    ),
  },
  { key: 'ipAddress', label: 'IP Address' },
  { key: 'browser', label: 'Browser' },
  { key: 'device', label: 'Device', render: (row) => row.device || 'desktop' },
  { key: 'visitCount', label: 'Visit Count' },
  {
    key: 'firstVisit',
    label: 'First Visit',
    render: (row) => formatDate(row.firstVisit || row.createdAt),
  },
  {
    key: 'lastVisit',
    label: 'Last Visit',
    render: (row) => formatDate(row.lastVisit || row.updatedAt),
  },
  {
    key: 'status',
    label: 'Status',
    render: (row) => (
      <span
        className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-semibold ${
          row.status === 'returning'
            ? 'bg-green-100 text-green-700'
            : 'bg-primary-100 text-primary-700'
        }`}
      >
        {row.status === 'returning' ? 'Returning' : 'New'}
      </span>
    ),
  },
];

export default function VisitorsManagement() {
  const [visitors, setVisitors] = useState([]);
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const requestRef = useRef(0);

  const fetchVisitors = useCallback(() => {
    const requestId = ++requestRef.current;
    getVisitors({ page, limit: 10, search })
      .then((response) => {
        if (requestId !== requestRef.current) return;
        const payload = response?.data;
        setVisitors(Array.isArray(payload?.data) ? payload.data : []);
        setStats(payload?.stats || null);
        setPagination(payload?.pagination || {});
      })
      .catch(() => {
        if (requestId !== requestRef.current) return;
      });
  }, [page, search]);

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const statCards = stats
    ? [
        { label: 'Total Visitors', value: stats.totalVisitors, color: 'bg-blue-500' },
        { label: "Today's Visitors", value: stats.todayVisitors, color: 'bg-green-500' },
        { label: 'Returning Visitors', value: stats.returningVisitors, color: 'bg-purple-500' },
        { label: 'Unique Visitors', value: stats.uniqueVisitors, color: 'bg-pink-500' },
      ]
    : [];

  return (
    <div>
      <AdminPageHeader title="Visitors" subtitle="Named visitors who personalized their CareerHub experience." />

      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {statCards.map((c) => (
            <StatCard key={c.label} {...c} />
          ))}
        </div>
      )}

      <form onSubmit={handleSearch} className="mb-4 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name, IP, or visitor ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors"
        >
          Search
        </button>
      </form>

      <ResponsiveAdminTable columns={columns} data={visitors} />

      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium ${
                page === i + 1 ? 'bg-primary-600 text-white' : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
