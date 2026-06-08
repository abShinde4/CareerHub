export default function ResponsiveAdminTable({ columns, data, renderActions }) {
  if (data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center text-gray-500 text-sm">
        No records found
      </div>
    );
  }

  return (
    <>
      <div className="hidden md:block bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                {columns.map((col) => (
                  <th key={col.key} className="text-left px-4 py-3 font-semibold text-gray-600 whitespace-nowrap">
                    {col.label}
                  </th>
                ))}
                {renderActions && <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3 text-gray-700">
                      {col.render ? col.render(row) : row[col.key]}
                    </td>
                  ))}
                  {renderActions && (
                    <td className="px-4 py-3 text-right">{renderActions(row)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden space-y-3">
        {data.map((row) => (
          <div key={row._id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
            {columns.map((col) => (
              <div key={col.key} className="flex justify-between items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
                <span className="text-xs font-semibold text-gray-500 shrink-0">{col.label}</span>
                <span className="text-sm text-gray-800 text-right">
                  {col.render ? col.render(row) : row[col.key]}
                </span>
              </div>
            ))}
            {renderActions && (
              <div className="flex flex-wrap gap-2 pt-3 mt-1 border-t border-gray-100">
                {renderActions(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}
