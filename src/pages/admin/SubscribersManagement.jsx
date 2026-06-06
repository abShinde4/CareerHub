import { useCallback, useEffect, useState } from 'react';
import { getSubscribers, deleteSubscriber, exportSubscribersCSV } from '../../services/subscriberService';
import { AdminPageHeader } from '../../components/admin/AdminTable';
import Button from '../../components/ui/Button';
import { formatDate } from '../../utils/formatDate';

export default function SubscribersManagement() {
  const [subscribers, setSubscribers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});

  const fetchSubscribers = useCallback(() => {
    getSubscribers({ page, limit: 20 }).then(({ data }) => {
      setSubscribers(data.data);
      setPagination(data.pagination);
    });
  }, [page]);

  useEffect(() => { fetchSubscribers(); }, [fetchSubscribers]);

  const handleExport = async () => {
    const { data } = await exportSubscribersCSV();
    const url = window.URL.createObjectURL(new Blob([data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete subscriber?')) return;
    await deleteSubscriber(id);
    fetchSubscribers();
  };

  return (
    <div>
      <AdminPageHeader title="Subscribers" />
      <div className="mb-4">
        <Button size="sm" onClick={handleExport}>Export CSV</Button>
      </div>
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-gray-600">Subscribed On</th>
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((s) => (
              <tr key={s._id} className="border-b border-gray-50">
                <td className="px-4 py-3">{s.email}</td>
                <td className="px-4 py-3 text-gray-500">{formatDate(s.createdAt)}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => handleDelete(s._id)} className="text-red-600 text-xs font-medium hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination.pages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: pagination.pages }, (_, i) => (
            <button key={i} onClick={() => setPage(i + 1)} className={`w-8 h-8 rounded-lg text-sm ${page === i + 1 ? 'bg-primary-600 text-white' : 'border'}`}>{i + 1}</button>
          ))}
        </div>
      )}
    </div>
  );
}
