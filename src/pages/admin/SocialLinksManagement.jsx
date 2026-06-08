import { useEffect, useState } from 'react';
import { getSocialLinks, updateSocialLinks } from '../../services/socialLinksService';

const FIELDS = ['youtube', 'instagram', 'linkedin', 'telegram', 'twitter', 'whatsapp'];

export default function SocialLinksManagement() {
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getSocialLinks().then(({ data }) => setForm(data.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await updateSocialLinks(form);
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">Social Links</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 max-w-xl space-y-4">
        {FIELDS.map((field) => (
          <div key={field}>
            <label className="text-sm font-medium text-gray-700 capitalize block mb-1">{field}</label>
            <input
              value={form[field] || ''}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              placeholder={`https://${field}.com/...`}
              className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40"
            />
          </div>
        ))}
        <button type="submit" disabled={loading} className="px-5 py-2.5 bg-primary-600 text-white rounded-xl text-sm font-semibold disabled:opacity-50">
          {loading ? 'Saving...' : saved ? 'Saved!' : 'Save Social Links'}
        </button>
      </form>
    </div>
  );
}
