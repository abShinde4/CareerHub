import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PublicLayout from '../../components/layout/PublicLayout';
import SEO from '../../components/ui/SEO';
import AiToolCard from '../../components/ai/AiToolCard';

const TOOLS = [
  {
    icon: '🤖',
    title: 'AI Career Chat',
    description: 'Get personalized career advice, roadmap guidance, interview tips, and salary insights from your AI assistant.',
    to: '/ai-tools/career-chat',
  },
  {
    icon: '📄',
    title: 'Resume Review',
    description: 'Upload your resume PDF and receive a detailed review with strengths, weaknesses, and improvement tips.',
    to: '/ai-tools/resume-review',
  },
  {
    icon: '📊',
    title: 'Resume ATS Score',
    description: 'Check how well your resume passes Applicant Tracking Systems with keyword match and formatting scores.',
    to: '/ai-tools/ats-score',
  },
  {
    icon: '✍️',
    title: 'AI Cover Letter',
    description: 'Generate professional, tailored cover letters for any company and role in seconds.',
    to: '/ai-tools/cover-letter',
  },
];

export default function AiToolsPage() {
  return (
    <PublicLayout>
      <SEO
        title="AI Tools | CareerHub"
        description="CareerHub AI — Your personal AI career assistant. Chat, resume review, ATS scoring, and cover letter generation."
        path="/ai-tools"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-6">
              ✨ Powered by AI
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-4">
              CareerHub <span className="text-gradient">AI</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your Personal AI Career Assistant
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {TOOLS.map((tool, i) => (
            <AiToolCard key={tool.to} {...tool} delay={0.1 + i * 0.08} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <Link
            to="/"
            className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
          >
            ← Back to CareerHub
          </Link>
        </motion.div>
      </div>
    </PublicLayout>
  );
}
