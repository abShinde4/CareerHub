import Button from '../ui/Button';

export default function AdminTable({ columns, data, onEdit, onDelete, onPublish, onDraft, onFeature, actions = ['edit', 'delete', 'publish', 'draft'] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              {columns.map((col) => (
                <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-600">
                  {col.label}
                </th>
              ))}
              <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length + 1} className="px-4 py-8 text-center text-gray-500">
                  No records found
                </td>
              </tr>
            )}
            {data.map((row) => (
              <tr key={row._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-gray-700">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3 text-right space-x-1">
                  {actions.includes('edit') && (
                    <button onClick={() => onEdit(row)} className="text-primary-600 hover:underline text-xs font-medium">Edit</button>
                  )}
                  {actions.includes('publish') && row.status === 'draft' && (
                    <button onClick={() => onPublish(row._id)} className="text-green-600 hover:underline text-xs font-medium">Publish</button>
                  )}
                  {actions.includes('draft') && row.status === 'published' && (
                    <button onClick={() => onDraft(row._id)} className="text-amber-600 hover:underline text-xs font-medium">Draft</button>
                  )}
                  {actions.includes('feature') && onFeature && (
                    <button onClick={() => onFeature(row._id)} className="text-purple-600 hover:underline text-xs font-medium">
                      {row.isFeatured ? 'Unfeature' : 'Feature'}
                    </button>
                  )}
                  {actions.includes('delete') && (
                    <button onClick={() => onDelete(row._id)} className="text-red-600 hover:underline text-xs font-medium">Delete</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminPageHeader({ title, onAdd, search, onSearch }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      <div className="flex gap-3">
        {onSearch && (
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search..."
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40"
          />
        )}
        {onAdd && (
          <Button size="sm" onClick={onAdd}>Add New</Button>
        )}
      </div>
    </div>
  );
}
