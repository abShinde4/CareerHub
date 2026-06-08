import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PublicLayout from '../components/layout/PublicLayout';
import StaticPageHeader from '../components/layout/StaticPageHeader';
import SEO from '../components/ui/SEO';
import SkeletonCard from '../components/ui/SkeletonCard';
import Badge from '../components/ui/Badge';
import { getGovernmentJobs } from '../services/governmentJobService';
import { mapGovernmentJobToCard } from '../utils/mapOpportunity';
import { FiMapPin, FiDollarSign } from 'react-icons/fi';

export default function GovernmentJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    let cancelled = false;
    getGovernmentJobs({ search, limit: 50 })
      .then(({ data }) => { if (!cancelled) setJobs(data.data.map(mapGovernmentJobToCard)); })
      .catch(() => { if (!cancelled) setJobs([]); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [search]);

  return (
    <PublicLayout>
      <SEO
        title="Government Jobs | CareerHub"
        description="Latest government job notifications, vacancies, and recruitment updates across India."
        path="/government-jobs"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <StaticPageHeader
          title="Government Jobs"
          subtitle="Latest government recruitment notifications and vacancies across India."
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search government jobs..."
          className="w-full mb-6 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/40"
        />
        <div className="space-y-4">
          {loading && Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
          {!loading && jobs.length === 0 && (
            <p className="text-center text-gray-500 py-12">No government jobs found.</p>
          )}
          {jobs.map((job, i) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass dark:glass-dark rounded-3xl p-5 shadow-soft w-full"
            >
              <Link to={`/government-job/${job.id}`} className="block">
                <h3 className="font-bold text-gray-900 dark:text-white text-lg hover:text-primary-600 transition-colors">{job.title}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{job.company}</p>
                <div className="flex flex-wrap gap-3 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><FiMapPin size={14} className="text-primary-400" />{job.location}</span>
                  <span className="flex items-center gap-1"><FiDollarSign size={14} className="text-primary-400" />{job.salary}</span>
                </div>
                <div className="mt-3"><Badge type="Government" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
