import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import PublicLayout from '../../components/layout/PublicLayout';
import SEO from '../../components/ui/SEO';
import Button from '../../components/ui/Button';
import AiStatusBanner from '../../components/ai/AiStatusBanner';
import { useAiStatus } from '../../hooks/useAiStatus';
import { reviewResume } from '../../services/aiService';

function ScoreCard({ score }) {
  const color =
    score >= 75 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : score >= 25 ? 'text-orange-500' : 'text-red-500';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass dark:glass-dark rounded-3xl p-8 text-center shadow-soft-lg mb-8"
    >
      <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
        Overall Resume Score
      </p>
      <p className={`text-6xl font-extrabold ${color}`}>{Math.round(score)}</p>
      <p className="text-gray-500 dark:text-gray-400 mt-2">out of 100</p>
    </motion.div>
  );
}

function ListSection({ title, items, variant = 'default' }) {
  if (!items?.length) return null;
  const colors = {
    default: 'text-gray-700 dark:text-gray-300',
    green: 'text-green-700 dark:text-green-400',
    red: 'text-red-700 dark:text-red-400',
    blue: 'text-blue-700 dark:text-blue-400',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass dark:glass-dark rounded-3xl p-6 shadow-soft"
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className={`text-sm leading-relaxed flex gap-2 ${colors[variant]}`}>
            <span className="shrink-0">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function ResumeReviewPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const { aiAvailable, aiUnavailable, statusLoading, statusMessage } = useAiStatus();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a PDF resume');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const formData = new FormData();
    formData.append('resume', file);

    try {
      const { data } = await reviewResume(formData);
      setResult(data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'AI Service unavailable');
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout>
      <SEO
        title="Resume Review | CareerHub AI"
        description="Get AI-powered resume review with strengths, weaknesses, and improvement tips."
        path="/ai-tools/resume-review"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/ai-tools" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📄 Resume Review</h1>
        </div>

        <AiStatusBanner
          statusLoading={statusLoading}
          aiAvailable={aiAvailable}
          statusMessage={statusMessage}
        />

        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft mb-8">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Upload Resume (PDF)
          </label>
          <div className="border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-2xl p-8 text-center hover:border-primary-400 transition-colors">
            <FiUpload className="mx-auto text-primary-500 mb-3" size={32} />
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary-600 file:text-white file:font-semibold file:cursor-pointer"
            />
            {file && <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{file.name}</p>}
          </div>
          {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full mt-6" disabled={loading || aiUnavailable || statusLoading}>
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </Button>
        </form>

        {result && (
          <div className="space-y-6">
            <ScoreCard score={result.overallScore} />
            <div className="grid gap-6">
              <ListSection title="💪 Strengths" items={result.strengths} variant="green" />
              <ListSection title="⚠️ Weaknesses" items={result.weaknesses} variant="red" />
              <ListSection title="🔧 Missing Skills" items={result.missingSkills} variant="blue" />
              <ListSection title="📐 Formatting Suggestions" items={result.formattingSuggestions} />
              <ListSection title="✏️ Grammar Suggestions" items={result.grammarSuggestions} />
              <ListSection title="💡 Improvement Tips" items={result.improvementTips} />
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
