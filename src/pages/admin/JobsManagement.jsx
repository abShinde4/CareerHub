import { useCallback, useEffect, useState } from 'react';
import AdminTable, { AdminPageHeader } from '../../components/admin/AdminTable';
import {
  adminGetJobs,
  createJob,
  updateJob,
  deleteJob,
  publishJob,
  draftJob,
  toggleFeaturedJob,
} from '../../services/jobService';

const CATEGORIES = ['full-time', 'internship', 'wfh', 'hackathon', 'fresher', 'part-time', 'government'];

const emptyForm = {
  title: '', company: '', companyLogo: '', location: '', salary: '', experience: '',
  category: 'full-time', applyLink: '', sourceLink: '', description: '', skills: '', status: 'draft', isFeatured: false,
};

export default function JobsManagement() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchJobs = useCallback(() => {
    adminGetJobs({ page, limit: 10, search }).then(({ data }) => {
      setJobs(data.data);
      setPagination(data.pagination);
    });
  }, [page, search]);

  useEffect(() => { fetchJobs(); }, [fetchJobs]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, skills: form.skills ? form.skills.split(',').map((s) => s.trim()) : [] };
    if (editingId) await updateJob(editingId, payload);
    else await createJob(payload);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    fetchJobs();
  };

  const handleEdit = (job) => {
    setForm({ ...job, skills: (job.skills || []).join(', ') });
    setEditingId(job._id);
    setShowForm(true);
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'category', label: 'Category' },
    { key: 'status', label: 'Status', render: (r) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
    )},
    { key: 'isFeatured', label: 'Featured', render: (r) => r.isFeatured ? '⭐' : '-' },
  ];

  return (
    <div>
      <AdminPageHeader title="Jobs" onAdd={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }} search={search} onSearch={(v) => { setSearch(v); setPage(1); }} />

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Job' : 'Add Job'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['title', 'company', 'companyLogo', 'location', 'salary', 'experience', 'applyLink', 'sourceLink'].map((f) => (
                <div key={f}>
                  <label className="text-xs font-medium text-gray-600 capitalize">{f.replace(/([A-Z])/g, ' $1')}</label>
                  <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm" required={['title', 'company', 'location', 'salary', 'experience'].includes(f)} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-600">Category</label>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-gray-600">Skills (comma separated)</label>
                <input value={form.skills} onChange={(e) => setForm({ ...form, skills: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-gray-600">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} />
                Featured Job
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="px-5 py-2 bg-primary-600 text-white rounded-xl text-sm font-semibold">Save</button>
              <button type="button" onClick={() => setShowForm(false)} className="px-5 py-2 border border-gray-200 rounded-xl text-sm">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <AdminTable
        columns={columns}
        data={jobs}
        onEdit={handleEdit}
        onDelete={async (id) => { if (confirm('Delete this job?')) { await deleteJob(id); fetchJobs(); } }}
        onPublish={async (id) => { await publishJob(id); fetchJobs(); }}
        onDraft={async (id) => { await draftJob(id); fetchJobs(); }}
        onFeature={async (id) => { await toggleFeaturedJob(id); fetchJobs(); }}
        actions={['edit', 'delete', 'publish', 'draft', 'feature']}
      />

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
