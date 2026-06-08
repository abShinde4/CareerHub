import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';

const SECTIONS = [
  {
    title: 'Information We Collect',
    content:
      'When you use CareerHub, we may collect information you voluntarily provide — such as your email address when subscribing to daily updates, joining our talent community, or contacting us through our contact form. We also collect basic usage data to improve our platform experience.',
  },
  {
    title: 'Email Subscription Data',
    content:
      'If you subscribe to our newsletter or talent community, we store your email address to send you job updates and career-related communications. You can unsubscribe at any time by contacting us at support@careerhub.com.',
  },
  {
    title: 'Cookies',
    content:
      'CareerHub uses cookies and similar technologies to remember your preferences (such as dark mode settings), maintain session state, and improve site performance. You can control cookie settings through your browser.',
  },
  {
    title: 'Analytics',
    content:
      'We may use analytics tools to understand how visitors interact with our platform — including pages visited, search queries, and referral sources. This data is aggregated and used solely to improve CareerHub.',
  },
  {
    title: 'Third Party Links',
    content:
      'CareerHub lists job and internship opportunities that link to external company websites. We are not responsible for the privacy practices of third-party sites. We encourage you to review their privacy policies before submitting personal information.',
  },
  {
    title: 'Data Protection',
    content:
      'We implement industry-standard security measures to protect your data, including encrypted connections (HTTPS) and secure database storage. However, no method of transmission over the internet is 100% secure.',
  },
  {
    title: 'User Rights',
    content:
      'You have the right to access, update, or delete your personal data stored with CareerHub. To exercise these rights, contact us at support@careerhub.com and we will respond within a reasonable timeframe.',
  },
  {
    title: 'Contact Information',
    content:
      'For privacy-related questions or requests, reach us at support@careerhub.com. We may update this policy periodically — the latest version will always be available on this page.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PublicLayout>
      <Helmet>
        <title>Privacy Policy | CareerHub</title>
        <meta name="description" content="CareerHub privacy policy — how we collect, use, and protect your personal information." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <StaticPageHeader
          title="Privacy Policy"
          subtitle="Last updated: June 2026. This policy explains how CareerHub handles your data."
        />

        <div className="space-y-5">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft"
            >
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{section.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{section.content}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
