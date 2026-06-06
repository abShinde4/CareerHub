import { motion } from 'framer-motion';
import { FiSearch } from 'react-icons/fi';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import { FLOATING_CARDS } from '../../data/jobs';

function HeroIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      {/* Background glow */}
      <div className="absolute inset-0 bg-linear-to-br from-primary-200/40 to-primary-400/20 dark:from-primary-800/30 dark:to-primary-600/10 rounded-full blur-3xl" />

      {/* Main illustration card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative z-10 glass dark:glass-dark rounded-3xl p-8 shadow-soft-lg"
      >
        <svg viewBox="0 0 280 240" className="w-full h-auto" fill="none">
          {/* Desk */}
          <rect x="40" y="170" width="200" height="8" rx="4" fill="#c4b5fd" />
          <rect x="60" y="178" width="12" height="40" rx="2" fill="#a78bfa" />
          <rect x="208" y="178" width="12" height="40" rx="2" fill="#a78bfa" />

          {/* Laptop */}
          <rect x="90" y="120" width="100" height="65" rx="6" fill="#7c3aed" />
          <rect x="95" y="125" width="90" height="50" rx="3" fill="#1e1b4b" />
          <rect x="100" y="130" width="80" height="35" rx="2" fill="#312e81" />
          <rect x="105" y="135" width="30" height="4" rx="2" fill="#8b5cf6" />
          <rect x="105" y="143" width="50" height="3" rx="1.5" fill="#6366f1" />
          <rect x="105" y="150" width="40" height="3" rx="1.5" fill="#6366f1" />
          <rect x="105" y="157" width="55" height="3" rx="1.5" fill="#6366f1" />
          <rect x="80" y="185" width="120" height="6" rx="3" fill="#6d28d9" />

          {/* Person */}
          <circle cx="140" cy="75" r="22" fill="#fcd9b6" />
          <path d="M118 75c0-12 10-22 22-22s22 10 22 22" fill="#4c1d95" />
          <rect x="115" y="95" width="50" height="30" rx="8" fill="#7c3aed" />
          <rect x="108" y="100" width="18" height="8" rx="4" fill="#fcd9b6" transform="rotate(-20 117 104)" />
          <rect x="154" y="100" width="18" height="8" rx="4" fill="#fcd9b6" transform="rotate(20 163 104)" />

          {/* Coffee cup */}
          <rect x="210" y="145" width="16" height="20" rx="3" fill="#f59e0b" />
          <path d="M226 150 Q234 150 234 158 Q234 166 226 166" stroke="#f59e0b" strokeWidth="3" fill="none" />

          {/* Plant */}
          <rect x="50" y="155" width="14" height="18" rx="2" fill="#d97706" />
          <ellipse cx="57" cy="148" rx="12" ry="10" fill="#22c55e" />
          <ellipse cx="50" cy="152" rx="8" ry="8" fill="#16a34a" />
          <ellipse cx="64" cy="152" rx="8" ry="8" fill="#16a34a" />
        </svg>
      </motion.div>

      {/* Floating job cards */}
      {FLOATING_CARDS.map((card, i) => {
        const positions = [
          { top: '5%', left: '-10%', delay: 0.5 },
          { top: '15%', right: '-15%', delay: 0.7 },
          { bottom: '20%', left: '-5%', delay: 0.9 },
        ];
        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: positions[i].delay, duration: 0.5 }}
            className="absolute z-20 glass dark:glass-dark rounded-2xl px-4 py-3 shadow-soft"
            style={positions[i]}
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              <p className="text-xs font-bold text-gray-900 dark:text-white">{card.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{card.company}</p>
              <p className="text-xs font-semibold text-primary-600 mt-0.5">{card.salary}</p>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero({ searchQuery, onSearch }) {
  const handleHeroSearch = () => {
    onSearch(searchQuery);
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-16 lg:pb-24">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-200/30 dark:bg-primary-800/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-100/40 dark:bg-primary-900/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              500+ new opportunities added today
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
              Find Jobs, Internships &{' '}
              <span className="text-gradient">Opportunities</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400 max-w-lg leading-relaxed">
              Daily updates of latest jobs, internships, hackathons and career opportunities.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <SearchBar
                value={searchQuery}
                onChange={onSearch}
                onSubmit={handleHeroSearch}
                size="lg"
              />
              <Button size="lg" onClick={handleHeroSearch} className="shrink-0">
                <FiSearch size={20} />
                Search
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {['Remote', 'Internship', 'Fresher', 'Hackathon'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => onSearch(tag)}
                  className="px-3.5 py-1.5 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-full hover:border-primary-300 hover:text-primary-600 transition-all duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden sm:block"
          >
            <HeroIllustration />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
