import { motion } from 'framer-motion';
import { FiBookmark, FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import Badge from './Badge';
import Button from './Button';

export default function JobCard({ job, isBookmarked, onBookmark, onApply, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="glass dark:glass-dark rounded-3xl p-5 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 group"
    >
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
          <img
            src={job.logo}
            alt={`${job.company} logo`}
            className="w-8 h-8 object-contain"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors truncate">
                {job.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mt-0.5">
                {job.company}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onBookmark(job.id)}
              className={`p-2 rounded-xl transition-colors shrink-0 ${
                isBookmarked
                  ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30'
                  : 'text-gray-400 hover:text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20'
              }`}
              aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark job'}
            >
              <FiBookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
            </motion.button>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5">
              <FiMapPin size={14} className="text-primary-400 shrink-0" />
              {job.location}
            </span>
            <span className="flex items-center gap-1.5">
              <FiDollarSign size={14} className="text-primary-400 shrink-0" />
              {job.salary}
            </span>
            <span className="flex items-center gap-1.5">
              <FiBriefcase size={14} className="text-primary-400 shrink-0" />
              {job.experience}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center gap-3">
          <Badge type={job.type} />
          <span className="text-xs text-gray-400">{job.postedAt}</span>
        </div>
        <Button size="sm" onClick={() => onApply(job)} className="w-full sm:w-auto">
          Apply Now
        </Button>
      </div>
    </motion.article>
  );
}
