import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiSend, FiUsers } from 'react-icons/fi';
import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/useToast';
import { joinTalentCommunity } from '../../services/talentService';

export default function CareersPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      addToast('Please enter your email address', 'info');
      return;
    }
    setLoading(true);
    try {
      await joinTalentCommunity(email.trim());
      addToast('Welcome to our talent community!', 'success');
      setEmail('');
    } catch {
      addToast('Something went wrong. Please try again.', 'info');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <Helmet>
        <title>Careers | CareerHub</title>
        <meta name="description" content="CareerHub careers — join our talent community and stay updated on future opportunities." />
      </Helmet>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <StaticPageHeader
          title="Careers at CareerHub"
          subtitle="Interested in building the future of career discovery? We'd love to connect."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass dark:glass-dark rounded-3xl p-8 sm:p-10 shadow-soft-lg text-center mb-8"
        >
          <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
            Currently we are not hiring.
          </p>
          <p className="mt-3 text-gray-600 dark:text-gray-400">
            We are not actively recruiting at the moment, but we are always interested in meeting talented people.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/40">
              <FiUsers className="text-primary-600" size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Join Our Talent Community</h2>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            Leave your email and we will reach out when new positions open up.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-4 py-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all"
            />
            <Button type="submit" disabled={loading} className="shrink-0">
              <FiSend size={16} />
              {loading ? 'Submitting...' : 'Submit'}
            </Button>
          </form>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
