import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import { TRENDING_SEARCHES } from '../../data/jobs';
import { useSocialLinks } from '../../context/useSocialLinks';
import NewsletterForm from '../ui/NewsletterForm';

export default function RightSidebar({ onTrendingClick }) {
  const links = useSocialLinks();

  const SOCIAL_LINKS = [
    { name: 'Telegram', icon: FaTelegram, color: 'bg-sky-500 hover:bg-sky-600', href: links.telegram },
    { name: 'WhatsApp', icon: FaWhatsapp, color: 'bg-green-500 hover:bg-green-600', href: links.whatsapp },
    { name: 'Instagram', icon: FaInstagram, color: 'bg-pink-500 hover:bg-pink-600', href: links.instagram },
    { name: 'YouTube', icon: FaYoutube, color: 'bg-red-500 hover:bg-red-600', href: links.youtube || 'https://www.youtube.com/@ArmanShinde' },
  ].filter((s) => s.href);

  return (
    <aside className="hidden xl:block w-72 shrink-0 space-y-5">
      <div className="sticky top-24 space-y-5">
        <motion.div
          id="newsletter-subscribe"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark rounded-3xl p-5 shadow-soft transition-all duration-500"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-xl bg-primary-100 dark:bg-primary-900/40">
              <FiMail className="text-primary-600" size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-white">Daily Updates</h3>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Get the latest jobs and internships delivered to your inbox.
          </p>
          <NewsletterForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="glass dark:glass-dark rounded-3xl p-5 shadow-soft"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h3>
          <div className="grid grid-cols-2 gap-2.5">
            {SOCIAL_LINKS.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl text-white text-sm font-semibold ${social.color} transition-colors`}
              >
                <social.icon size={18} />
                {social.name}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="glass dark:glass-dark rounded-3xl p-5 shadow-soft"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">Government Jobs</h3>
          <Link to="/government-jobs" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all government notifications →
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="glass dark:glass-dark rounded-3xl p-5 shadow-soft"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Trending Searches</h3>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((term) => (
              <button
                key={term}
                onClick={() => onTrendingClick(term)}
                className="px-3.5 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-full hover:border-primary-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-200"
              >
                {term}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </aside>
  );
}
