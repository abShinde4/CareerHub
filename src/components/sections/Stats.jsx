import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getPublicStats } from '../../services/statsService';
import { formatStat } from '../../utils/mapOpportunity';
import { STATS as FALLBACK_STATS } from '../../data/jobs';

export default function Stats() {
  const [stats, setStats] = useState(FALLBACK_STATS);

  useEffect(() => {
    getPublicStats()
      .then(({ data }) => {
        const s = data.data;
        setStats([
          { value: formatStat(s.jobs), label: 'Job Opportunities' },
          { value: formatStat(s.internships), label: 'Internships' },
          { value: formatStat(s.companies), label: 'Companies' },
          { value: formatStat(s.hackathons), label: 'Hackathons' },
        ]);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass dark:glass-dark rounded-3xl shadow-soft-lg p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="text-center"
              >
                <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gradient">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
