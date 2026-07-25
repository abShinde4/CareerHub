import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import PublicLayout from '../../components/layout/PublicLayout';
import SEO from '../../components/ui/SEO';
import Button from '../../components/ui/Button';
import CircularProgress from '../../components/ai/CircularProgress';
import AiStatusBanner from '../../components/ai/AiStatusBanner';
import { useAiStatus } from '../../hooks/useAiStatus';
import { scoreResumeATS } from '../../services/aiService';

function MetricBar({ label, value }) {
  const clamped = Math.min(100, Math.max(0, value || 0));
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-bold text-primary-600 dark:text-primary-400">{Math.round(clamped)}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-primary-500 to-primary-600 transition-all duration-1000"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}

export default function AtsScorePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
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
    if (jobDescription.trim()) formData.append('jobDescription', jobDescription.trim());

    try {
      const { data } = await scoreResumeATS(formData);
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
        title="Resume ATS Score | CareerHub AI"
        description="Check your resume ATS compatibility with keyword match and formatting analysis."
        path="/ai-tools/ats-score"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/ai-tools" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Resume ATS Score</h1>
        </div>

        <AiStatusBanner
          statusLoading={statusLoading}
          aiAvailable={aiAvailable}
          statusMessage={statusMessage}
        />

        <form onSubmit={handleSubmit} className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft mb-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
              Upload Resume (PDF)
            </label>
            <div className="border-2 border-dashed border-primary-200 dark:border-primary-800 rounded-2xl p-6 text-center">
              <FiUpload className="mx-auto text-primary-500 mb-2" size={28} />
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-primary-600 file:text-white file:font-semibold file:cursor-pointer"
              />
              {file && <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{file.name}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Job Description (Optional)
            </label>
            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
              placeholder="Paste the job description for targeted keyword matching..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          <Button type="submit" className="w-full" disabled={loading || aiUnavailable || statusLoading}>
            {loading ? 'Scoring...' : 'Get ATS Score'}
          </Button>
        </form>

        {result && (
          <div className="glass dark:glass-dark rounded-3xl p-8 shadow-soft-lg space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-8 justify-center">
              <CircularProgress value={result.overallScore} label="ATS Score" />
              <div className="flex-1 w-full space-y-4">
                <MetricBar label="Keyword Match" value={result.keywordMatch} />
                <MetricBar label="Formatting Score" value={result.formattingScore} />
              </div>
            </div>

            {result.missingSkills?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Missing Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {result.missingSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl text-sm bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {result.suggestions?.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Suggestions</h3>
                <ul className="space-y-2">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                      <span className="text-primary-500 shrink-0">→</span>
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
