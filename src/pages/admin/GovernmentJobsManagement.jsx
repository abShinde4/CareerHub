import { useCallback, useEffect, useState } from 'react';
import ResponsiveAdminTable from '../../components/admin/ResponsiveAdminTable';
import { AdminPageHeader } from '../../components/admin/AdminTable';
import {
  adminGetGovernmentJobs, createGovernmentJob, updateGovernmentJob,
  deleteGovernmentJob, publishGovernmentJob, draftGovernmentJob,
} from '../../services/governmentJobService';

const empty = {
  title: '', department: '', location: '', salary: '', qualification: '',
  totalVacancies: '', officialWebsite: '', notificationPDF: '', description: '',
  applicationStartDate: '', applicationEndDate: '', featured: false, status: 'draft',
};

export default function GovernmentJobsManagement() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = useCallback(() => {
    adminGetGovernmentJobs({ search, limit: 50 }).then(({ data }) => setItems(data.data));
  }, [search]);

  useEffect(() => { fetch(); }, [fetch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (editingId) await updateGovernmentJob(editingId, payload);
    else await createGovernmentJob(payload);
    setShowForm(false); setForm(empty); setEditingId(null); fetch();
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
    { key: 'status', label: 'Status', render: (r) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
    )},
  ];

  const actions = (row) => (
    <>
      <button onClick={() => { setForm({ ...row, applicationStartDate: row.applicationStartDate?.slice?.(0, 10) || '', applicationEndDate: row.applicationEndDate?.slice?.(0, 10) || '' }); setEditingId(row._id); setShowForm(true); }} className="text-primary-600 text-xs font-medium">Edit</button>
      {row.status === 'draft' && <button onClick={async () => { await publishGovernmentJob(row._id); fetch(); }} className="text-green-600 text-xs font-medium">Publish</button>}
      {row.status === 'published' && <button onClick={async () => { await draftGovernmentJob(row._id); fetch(); }} className="text-amber-600 text-xs font-medium">Draft</button>}
      <button onClick={async () => { if (confirm('Delete?')) { await deleteGovernmentJob(row._id); fetch(); } }} className="text-red-600 text-xs font-medium">Delete</button>
    </>
  );

  return (
    <div>
      <AdminPageHeader title="Government Jobs" onAdd={() => { setShowForm(true); setEditingId(null); setForm(empty); }} search={search} onSearch={setSearch} />
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-4 sm:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Government Job</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {['title', 'department', 'location', 'salary', 'qualification', 'totalVacancies', 'officialWebsite', 'notificationPDF'].map((f) => (
                <input key={f} value={form[f] || ''} onChange={(e) => setForm({ ...form, [f]: e.target.value })} placeholder={f} required={['title', 'department', 'location'].includes(f)} className="px-3 py-2 rounded-xl border text-sm" />
              ))}
              <input type="date" value={form.applicationStartDate} onChange={(e) => setForm({ ...form, applicationStartDate: e.target.value })} className="px-3 py-2 rounded-xl border text-sm" />
              <input type="date" value={form.applicationEndDate} onChange={(e) => setForm({ ...form, applicationEndDate: e.target.value })} className="px-3 py-2 rounded-xl border text-sm" />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="px-3 py-2 rounded-xl border text-sm">
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="Description" className="w-full mt-3 px-3 py-2 rounded-xl border text-sm" />
            <label className="flex items-center gap-2 text-sm mt-3">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured
            </label>
            <div className="flex gap-2 mt-4">
              <button type="submit" className="px-4 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded-xl text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}
      <ResponsiveAdminTable columns={columns} data={items} renderActions={actions} />
    </div>
  );
}
