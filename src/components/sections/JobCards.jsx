import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import JobCard from '../ui/JobCard';
import SkeletonCard from '../ui/SkeletonCard';
import { useToast } from '../../context/useToast';

export default function JobCards({ jobs, bookmarks, onBookmark, loading }) {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleApply = (job) => {
    const routes = {
      job: `/job/${job.id}`,
      internship: `/internship/${job.id}`,
      hackathon: `/hackathon/${job.id}`,
      government: `/government-job/${job.id}`,
    };
    navigate(routes[job.opportunityType] || `/job/${job.id}`);
  };

  const handleBookmark = (jobId) => {
    const wasBookmarked = bookmarks.includes(jobId);
    onBookmark(jobId);
    addToast(
      wasBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks!',
      'success'
    );
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass dark:glass-dark rounded-3xl p-12 text-center shadow-soft"
      >
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          No opportunities found
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Try adjusting your search or filter criteria
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {jobs.map((job, i) => (
        <JobCard
          key={job.id}
          job={job}
          index={i}
          isBookmarked={bookmarks.includes(job.id)}
          onBookmark={handleBookmark}
          onApply={handleApply}
        />
      ))}
    </div>
  );
}
