import { useEffect, useState } from 'react';
import ResponsiveAdminTable from '../../components/admin/ResponsiveAdminTable';
import { AdminPageHeader } from '../../components/admin/AdminTable';
import {
  adminGetHighlights, createHighlight, updateHighlight,
  deleteHighlight, toggleHighlight,
} from '../../services/heroHighlightService';

const POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
const empty = { companyName: '', roleTitle: '', salaryText: '', position: 'top-left', sortOrder: 0, isActive: true };

export default function HeroHighlightsManagement() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetch = () => adminGetHighlights().then(({ data }) => setItems(data.data));
  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) await updateHighlight(editingId, form);
    else await createHighlight(form);
    setShowForm(false); setForm(empty); setEditingId(null); fetch();
  };

  const columns = [
    { key: 'roleTitle', label: 'Role' },
    { key: 'companyName', label: 'Company' },
    { key: 'salaryText', label: 'Salary' },
    { key: 'position', label: 'Position' },
    { key: 'isActive', label: 'Status', render: (r) => r.isActive ? '✅ Active' : '❌ Inactive' },
  ];

  const actions = (row) => (
    <>
      <button onClick={() => { setForm(row); setEditingId(row._id); setShowForm(true); }} className="text-primary-600 text-xs font-medium">Edit</button>
      <button onClick={async () => { await toggleHighlight(row._id); fetch(); }} className="text-amber-600 text-xs font-medium">Toggle</button>
      <button onClick={async () => { if (confirm('Delete?')) { await deleteHighlight(row._id); fetch(); } }} className="text-red-600 text-xs font-medium">Delete</button>
    </>
  );

  return (
    <div>
      <AdminPageHeader title="Hero CMS" onAdd={() => { setShowForm(true); setEditingId(null); setForm(empty); }} />
      {showForm && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-bold mb-4">{editingId ? 'Edit' : 'Add'} Hero Card</h2>
            {['companyName', 'roleTitle', 'salaryText'].map((f) => (
              <input key={f} value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })} required placeholder={f} className="w-full px-3 py-2 rounded-xl border text-sm mb-3" />
            ))}
            <select value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} className="w-full px-3 py-2 rounded-xl border text-sm mb-3">
              {POSITIONS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
            <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: Number(e.target.value) })} placeholder="Sort order" className="w-full px-3 py-2 rounded-xl border text-sm mb-3" />
            <label className="flex items-center gap-2 text-sm mb-4">
              <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> Active
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
