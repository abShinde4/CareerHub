import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import { getActiveAnnouncement } from '../../services/announcementService';
import { getActiveHighlights } from '../../services/heroHighlightService';

const POSITION_STYLES = {
  'top-left': { top: '5%', left: '0%' },
  'top-right': { top: '10%', right: '0%' },
  'bottom-left': { bottom: '15%', left: '0%' },
  'bottom-right': { bottom: '10%', right: '0%' },
};

function HeroIllustration({ highlights }) {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square overflow-visible">
      <div className="absolute inset-0 bg-linear-to-br from-primary-200/40 to-primary-400/20 dark:from-primary-800/30 dark:to-primary-600/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg"
      >
        <svg viewBox="0 0 280 240" className="w-full h-auto" fill="none">
          <rect x="40" y="170" width="200" height="8" rx="4" fill="#c4b5fd" />
          <rect x="60" y="178" width="12" height="40" rx="2" fill="#a78bfa" />
          <rect x="208" y="178" width="12" height="40" rx="2" fill="#a78bfa" />
          <rect x="90" y="120" width="100" height="65" rx="6" fill="#7c3aed" />
          <rect x="95" y="125" width="90" height="50" rx="3" fill="#1e1b4b" />
          <rect x="100" y="130" width="80" height="35" rx="2" fill="#312e81" />
          <circle cx="140" cy="75" r="22" fill="#fcd9b6" />
          <path d="M118 75c0-12 10-22 22-22s22 10 22 22" fill="#4c1d95" />
          <rect x="115" y="95" width="50" height="30" rx="8" fill="#7c3aed" />
        </svg>
      </motion.div>

      {highlights.map((card, i) => (
        <motion.div
          key={card._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.15, duration: 0.5 }}
          className="absolute z-20 glass dark:glass-dark rounded-2xl px-3 sm:px-4 py-2 sm:py-3 shadow-soft max-w-[140px] sm:max-w-none"
          style={POSITION_STYLES[card.position] || POSITION_STYLES['top-left']}
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white truncate">{card.roleTitle}</p>
            <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 truncate">{card.companyName}</p>
            <p className="text-[10px] sm:text-xs font-semibold text-primary-600 mt-0.5">{card.salaryText}</p>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero({ searchQuery, onSearch }) {
  const [announcement, setAnnouncement] = useState(null);
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    getActiveAnnouncement().then(({ data }) => setAnnouncement(data.data)).catch(() => {});
    getActiveHighlights().then(({ data }) => setHighlights(data.data || [])).catch(() => {});
  }, []);

  const handleHeroSearch = () => {
    onSearch(searchQuery);
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-8 sm:pb-16 lg:pt-16 lg:pb-24">
      <div className="absolute top-0 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-primary-100/40 dark:bg-primary-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="min-w-0"
          >
            {announcement && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-xs sm:text-sm font-semibold mb-4 sm:mb-6 max-w-full"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
                <span className="truncate">{announcement.text}</span>
              </motion.div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Find Jobs, Internships &{' '}
              <span className="text-gradient">Opportunities</span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              Daily updates of latest jobs, internships, hackathons and career opportunities.
            </p>

            <div className="mt-6 sm:mt-8 flex flex-col gap-3 w-full">
              <SearchBar
                value={searchQuery}
                onChange={onSearch}
                onSubmit={handleHeroSearch}
                size="lg"
                className="w-full"
              />
              <Button size="lg" onClick={handleHeroSearch} className="w-full sm:w-auto">
                <FiSearch size={20} />
                Search
              </Button>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-wrap gap-2">
              {['Remote', 'Internship', 'Fresher', 'Hackathon'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearch(tag)}
                  className="px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-full hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block min-w-0"
          >
            <HeroIllustration highlights={highlights} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
