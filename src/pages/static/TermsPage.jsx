import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';

const SECTIONS = [
  {
    title: 'Acceptance of Terms',
    content:
      'By accessing and using CareerHub, you agree to be bound by these Terms & Conditions. If you do not agree, please discontinue use of the platform immediately.',
  },
  {
    title: 'User Responsibilities',
    content:
      'Users must provide accurate information when subscribing or contacting us. You agree not to misuse the platform, submit false information, scrape data without permission, or engage in any activity that disrupts CareerHub services.',
  },
  {
    title: 'Accuracy of Job Listings',
    content:
      'CareerHub aggregates job, internship, and hackathon listings from various sources. While we strive for accuracy, we do not guarantee that all listings are current, complete, or error-free. Always verify details on the official company application page.',
  },
  {
    title: 'External Links Disclaimer',
    content:
      'CareerHub contains links to third-party websites for job applications and resources. We are not responsible for the content, policies, or practices of external sites. Clicking external links is at your own risk.',
  },
  {
    title: 'Intellectual Property',
    content:
      'All content on CareerHub — including branding, design, text, and original materials — is the property of CareerHub unless otherwise stated. You may not reproduce, distribute, or create derivative works without written permission.',
  },
  {
    title: 'Limitation of Liability',
    content:
      'CareerHub is provided "as is" without warranties of any kind. We are not liable for any direct, indirect, or consequential damages arising from your use of the platform, including missed opportunities or reliance on listed information.',
  },
  {
    title: 'Account Usage',
    content:
      'Administrative accounts are for authorized personnel only. Admin users must maintain confidentiality of login credentials and are responsible for all actions performed under their account.',
  },
  {
    title: 'Termination Rights',
    content:
      'CareerHub reserves the right to suspend or terminate access to any user or admin account that violates these terms, without prior notice. We may also modify or discontinue any part of the service at any time.',
  },
];

export default function TermsPage() {
  return (
    <PublicLayout>
      <Helmet>
        <title>Terms & Conditions | CareerHub</title>
        <meta name="description" content="CareerHub terms and conditions — rules and guidelines for using our job portal platform." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <StaticPageHeader
          title="Terms & Conditions"
          subtitle="Please read these terms carefully before using CareerHub."
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
