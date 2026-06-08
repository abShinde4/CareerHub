import { useEffect, useState } from 'react';
import ResponsiveAdminTable from '../../components/admin/ResponsiveAdminTable';
import { AdminPageHeader } from '../../components/admin/AdminTable';
import {
  adminGetAnnouncements, createAnnouncement, updateAnnouncement,
  deleteAnnouncement, toggleAnnouncement,
} from '../../services/announcementService';

const empty = { text: '', isActive: false };

export default function AnnouncementsManagement() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = () => adminGetAnnouncements().then(({ data }) => setItems(data.data));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateAnnouncement(editingId, form);
    else await createAnnouncement(form);
    setShowForm(false); setForm(empty); setEditingId(null); fetch();
  };

  const columns = [
    { key: 'text', label: 'Text' },
    { key: 'isActive', label: 'Status', render: (r) => (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
        {r.isActive ? 'Active' : 'Inactive'}
      </span>
    )},
  ];

  const actions = (row) => (
    <>
      <button onClick={() => { setForm(row); setEditingId(row._id); setShowForm(true); }} className="text-primary-600 text-xs font-medium">Edit</button>
      <button onClick={async () => { await toggleAnnouncement(row._id); fetch(); }} className="text-amber-600 text-xs font-medium">{row.isActive ? 'Deactivate' : 'Activate'}</button>
      <button onClick={async () => { if (confirm('Delete?')) { await deleteAnnouncement(row._id); fetch(); } }} className="text-red-600 text-xs font-medium">Delete</button>
    </>
  );

  return (
    <div>
      <AdminPageHeader title="Announcements" onAdd={() => { setShowForm(true); setEditingId(null); setForm(empty); }} />
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Announcement</h2>
            <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} required rows={3} className="w-full px-3 py-2 rounded-xl border text-sm mb-3" placeholder="Announcement text" />
            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Set as active
            </label>
            <div className="flex gap-2">
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
