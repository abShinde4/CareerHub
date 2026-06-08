import { motion } from 'framer-motion';
import { FaYoutube } from 'react-icons/fa';
import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';
import SEO from '../../components/ui/SEO';
import Button from '../../components/ui/Button';
import { useSocialLinks } from '../../context/useSocialLinks';

const SECTIONS = [
  {
    title: 'Who We Are',
    content:
      'CareerHub is a career discovery platform built for students, fresh graduates, and job seekers across India. We aggregate opportunities from top companies, startups, and organizations — making it easier to find your next role, internship, or hackathon in one place.',
  },
  {
    title: 'Our Mission',
    content:
      'To make career opportunities accessible to everyone. We believe talent is everywhere, but opportunity is not — and we are working to bridge that gap with daily updates, curated listings, and community-driven resources.',
  },
  {
    title: 'What We Provide',
    items: [
      'Latest full-time and part-time job listings',
      'Internship opportunities for students and freshers',
      'Hackathons and coding competitions',
      'Work from home and remote roles',
      'Government and fresher-specific hiring drives',
      'Daily email updates on new opportunities',
    ],
  },
  {
    title: 'Why Choose CareerHub',
    items: [
      'Fresh listings updated daily',
      'Clean, fast, and mobile-friendly experience',
      'Opportunities across multiple categories',
      'Free access for all job seekers',
      'Community channels for career discussions',
    ],
  },
];

export default function AboutPage() {
  const links = useSocialLinks();
  const youtubeUrl = links.youtube || 'https://www.youtube.com/@ArmanShinde';

  return (
    <PublicLayout>
      <SEO title="About Us | CareerHub" description="Learn about CareerHub — our mission to make jobs, internships, and career opportunities accessible to everyone." path="/about" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <StaticPageHeader
          title="About CareerHub"
          subtitle="CareerHub is a platform that helps students and job seekers discover jobs, internships, hackathons, fresher opportunities and career resources."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg mb-8"
        >
          <h2 className="text-lg font-bold text-primary-600 dark:text-primary-400 mb-2">Mission</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            To make career opportunities accessible to everyone.
          </p>
        </motion.div>

        <div className="space-y-6">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{section.title}</h2>
              {section.content && (
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{section.content}</p>
              )}
              {section.items && (
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-gray-600 dark:text-gray-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg mt-8 text-center"
        >
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Watch Us on YouTube</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm sm:text-base">Career tips, job alerts, and interview guidance on our channel.</p>
          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg"><FaYoutube size={20} /> Subscribe on YouTube</Button>
          </a>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
