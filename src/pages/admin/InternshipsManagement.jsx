import { useCallback, useEffect, useState } from 'react';
import AdminTable, { AdminPageHeader } from '../../components/admin/AdminTable';
import {
  adminGetInternships,
  createInternship,
  updateInternship,
  deleteInternship,
  publishInternship,
  draftInternship,
} from '../../services/internshipService';

const emptyForm = {
  title: '', company: '', stipend: '', duration: '', location: '',
  applyLink: '', sourceLink: '', description: '', status: 'draft',
};

export default function InternshipsManagement() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const fetchItems = useCallback(() => {
    adminGetInternships({ page, limit: 10, search }).then(({ data }) => {
      setItems(data.data);
      setPagination(data.pagination);
    });
  }, [page, search]);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateInternship(editingId, form);
    else await createInternship(form);
    setShowForm(false);
    setForm(emptyForm);
    setEditingId(null);
    fetchItems();
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'company', label: 'Company' },
    { key: 'stipend', label: 'Stipend' },
    { key: 'status', label: 'Status', render: (r) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{r.status}</span>
    )},
  ];

  return (
    <div>
      <AdminPageHeader title="Internships" onAdd={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }} search={search} onSearch={(v) => { setSearch(v); setPage(1); }} />

      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit Internship' : 'Add Internship'}</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['title', 'company', 'stipend', 'duration', 'location', 'applyLink', 'sourceLink'].map((f) => (
                <div key={f}>
                  <label className="text-xs font-medium text-gray-600 capitalize">{f}</label>
                  <input value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm" required={['title', 'company', 'stipend', 'duration', 'location'].includes(f)} />
                </div>
              ))}
              <div>
                <label className="text-xs font-medium text-gray-600">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-gray-600">Description</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} className="w-full mt-1 px-3 py-2 rounded-xl border border-gray-200 text-sm" />
              </div>
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
        data={items}
        onEdit={(row) => { setForm(row); setEditingId(row._id); setShowForm(true); }}
        onDelete={async (id) => { if (confirm('Delete?')) { await deleteInternship(id); fetchItems(); } }}
        onPublish={async (id) => { await publishInternship(id); fetchItems(); }}
        onDraft={async (id) => { await draftInternship(id); fetchItems(); }}
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
