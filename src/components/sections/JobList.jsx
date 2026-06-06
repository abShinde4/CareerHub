import { motion } from 'framer-motion';
import { FiFilter } from 'react-icons/fi';
import JobCards from './JobCards';
import Pagination from '../ui/Pagination';
import { CATEGORIES } from '../../data/jobs';

export default function JobList({
  jobs,
  totalJobs,
  bookmarks,
  currentPage,
  totalPages,
  activeCategory,
  searchQuery,
  loading,
  onPageChange,
  onCategoryChange,
  onBookmark,
}) {
  const activeLabel = CATEGORIES.find((c) => c.id === activeCategory)?.label || 'All Opportunities';
  const listKey = `${activeCategory}-${searchQuery}-${currentPage}`;

  return (
    <section id="jobs" className="flex-1 min-w-0">
      <div className="mb-6">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold text-gray-900 dark:text-white"
        >
          Latest Opportunities
        </motion.h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {loading ? 'Loading...' : `${totalJobs} ${activeLabel.toLowerCase()} found`}
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      <div className="lg:hidden mb-5">
        <div className="flex items-center gap-2 mb-3">
          <FiFilter className="text-primary-500" size={16} />
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Filter by Category</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                  : 'bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <JobCards
        key={listKey}
        jobs={jobs}
        bookmarks={bookmarks}
        onBookmark={onBookmark}
        loading={loading}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </section>
  );
}
