export default function SkeletonCard() {
  return (
    <div className="glass dark:glass-dark rounded-3xl p-5 shadow-soft animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gray-200 dark:bg-gray-700 shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2" />
          <div className="flex gap-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-24" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-20" />
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-2xl w-24" />
      </div>
    </div>
  );
}
