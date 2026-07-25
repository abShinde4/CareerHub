import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { setVisitorName, hasVisitorName } from '../../utils/visitorName';
import { getOrCreateVisitorId, markVisitorRegistered, markSessionVisitRecorded } from '../../utils/visitorIdentity';
import { registerVisitor } from '../../services/namedVisitorService';

export default function WelcomeModal() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (location.pathname.startsWith('/admin')) return;
    if (!hasVisitorName()) {
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleContinue = async () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setVisitorName(trimmed);
    setOpen(false);

    const visitorId = getOrCreateVisitorId();
    try {
      await registerVisitor(visitorId, trimmed);
      markVisitorRegistered();
      markSessionVisitRecorded();
    } catch {
      // Name stays in localStorage; sync can retry on next session if needed
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="w-full max-w-md glass dark:glass-dark rounded-3xl p-8 shadow-soft-lg border border-white/30 dark:border-white/10"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary-500 to-primary-700 text-3xl shadow-lg shadow-primary-600/30 mb-4">
                👋
              </div>
              <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-2">
                Welcome to CareerHub
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Let&apos;s personalize your experience.
              </p>
            </div>

            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Enter Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleContinue()}
              placeholder="Your name"
              autoFocus
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 mb-6 transition-all"
            />

            <Button className="w-full" onClick={handleContinue} disabled={!name.trim()}>
              Continue
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
