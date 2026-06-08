import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import { useSocialLinks } from '../../context/useSocialLinks';
import Button from '../ui/Button';

export default function YouTubeSection() {
  const links = useSocialLinks();
  const youtubeUrl = links.youtube || 'https://www.youtube.com/@ArmanShinde';

  return (
    <section className="py-10 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass dark:glass-dark rounded-3xl p-5 sm:p-8 lg:p-10 shadow-soft-lg"
        >
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div className="min-w-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-red-500 text-white shrink-0">
                  <FaYoutube size={22} />
                </div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white">
                  Career Tips on YouTube
                </h2>
              </div>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                Subscribe to our YouTube channel for career guidance, interview tips, job alerts, and internship opportunities.
              </p>
              <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full sm:w-auto">
                  <FaYoutube size={20} />
                  Subscribe on YouTube
                </Button>
              </a>
            </div>
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden aspect-video bg-linear-to-br from-red-500/10 to-primary-500/10 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center gap-3 p-6 hover:shadow-soft transition-shadow"
            >
              <FaYoutube size={48} className="text-red-500" />
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">@ArmanShinde</p>
              <p className="text-xs text-gray-500 text-center">Watch latest career videos</p>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
