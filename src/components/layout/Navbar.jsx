import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { useTheme } from '../../context/useTheme';
import SearchBar from '../ui/SearchBar';
import Button from '../ui/Button';
import SubscribeModal from '../ui/SubscribeModal';

const NAV_LINKS = [
  'Home',
  'Jobs',
  'Internships',
  'Companies',
  'Hackathons',
  'Resources',
  'Blog',
];

export default function Navbar({ searchQuery, onSearch }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleNavClick = (link) => {
    setMobileOpen(false);
    if (link === 'Home') {
      navigate('/');
    } else {
      navigate(`/#${link.toLowerCase()}`);
    }
  };

  const handleGetUpdates = () => {
    setMobileOpen(false);
    const newsletterEl = document.getElementById('newsletter-subscribe');
    const isDesktop = window.innerWidth >= 1280;

    if (isDesktop && newsletterEl) {
      newsletterEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      newsletterEl.classList.add('ring-2', 'ring-primary-500/50');
      setTimeout(() => {
        newsletterEl.classList.remove('ring-2', 'ring-primary-500/50');
      }, 2000);
    } else {
      setSubscribeOpen(true);
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-50 glass dark:glass-dark border-b border-white/20 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4">
            {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
          >
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-md shadow-primary-600/30">
                <HiOutlineBriefcase className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                Career<span className="text-primary-600">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              >
                {link}
              </button>
            ))}
            </div>

            {/* Search - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xs">
              <SearchBar
                value={searchQuery}
                onChange={onSearch}
                size="sm"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              </motion.button>

              <Button
                size="sm"
                className="hidden sm:inline-flex"
                onClick={handleGetUpdates}
              >
                🔔 Get Daily Updates
              </Button>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="xl:hidden p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-3">
                <SearchBar value={searchQuery} onChange={onSearch} size="sm" />
                <div className="grid grid-cols-2 gap-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    type="button"
                    onClick={() => handleNavClick(link)}
                    className="px-3 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-center"
                  >
                    {link}
                  </button>
                ))}
                </div>
                <Button size="sm" className="w-full" onClick={handleGetUpdates}>
                  🔔 Get Daily Updates
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
    </>
  );
}
