export default function AiStatusBanner({ statusLoading, aiAvailable, statusMessage }) {
  if (statusLoading) {
    return (
      <div className="mb-4 px-4 py-3 rounded-2xl bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-700">
        Checking AI service...
      </div>
    );
  }

  if (aiAvailable) {
    return (
      <div className="mb-4 px-4 py-3 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 text-sm border border-green-200 dark:border-green-800">
        {statusMessage}
      </div>
    );
  }

  return (
    <div className="mb-4 px-4 py-3 rounded-2xl bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 text-sm border border-amber-200 dark:border-amber-800">
      {statusMessage}
    </div>
  );
}
