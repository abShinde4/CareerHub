import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCopy, FiDownload, FiRefreshCw } from 'react-icons/fi';
import PublicLayout from '../../components/layout/PublicLayout';
import SEO from '../../components/ui/SEO';
import Button from '../../components/ui/Button';
import AiStatusBanner from '../../components/ai/AiStatusBanner';
import { useAiStatus } from '../../hooks/useAiStatus';
import { useToast } from '../../context/useToast';
import { generateCoverLetter } from '../../services/aiService';

export default function CoverLetterPage() {
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [resume, setResume] = useState('');
  const [experience, setExperience] = useState('');
  const [letter, setLetter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { aiAvailable, aiUnavailable, statusLoading, statusMessage } = useAiStatus();
  const { addToast } = useToast();

  const handleGenerate = async () => {
    if (!company.trim() || !role.trim()) {
      setError('Company and role are required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await generateCoverLetter({
        company: company.trim(),
        role: role.trim(),
        resume: resume.trim(),
        experience: experience.trim(),
      });
      setLetter(data.letter);
    } catch (err) {
      setError(err.response?.data?.message || 'AI Service unavailable');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!letter) return;
    try {
      await navigator.clipboard.writeText(letter);
      addToast('Copied to clipboard!', 'success');
    } catch {
      addToast('Failed to copy', 'error');
    }
  };

  const handleDownload = () => {
    if (!letter) return;
    const blob = new Blob([letter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cover-letter-${company.replace(/\s+/g, '-').toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    addToast('Downloaded!', 'success');
  };

  return (
    <PublicLayout>
      <SEO
        title="AI Cover Letter | CareerHub"
        description="Generate professional cover letters tailored to any company and role."
        path="/ai-tools/cover-letter"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="flex items-center gap-3 mb-8">
          <Link to="/ai-tools" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">✍️ AI Cover Letter</h1>
        </div>

        <AiStatusBanner
          statusLoading={statusLoading}
          aiAvailable={aiAvailable}
          statusMessage={statusMessage}
        />

        <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft mb-8 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Company</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Role</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Resume / Background</label>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={4}
              placeholder="Paste key points from your resume or background..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Experience</label>
            <textarea
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              rows={3}
              placeholder="Briefly describe your relevant experience..."
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 resize-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button className="w-full" onClick={handleGenerate} disabled={loading || aiUnavailable || statusLoading}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {letter && (
          <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Your Cover Letter</h2>
            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm leading-relaxed mb-6 p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700">
              {letter}
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={handleCopy}>
                <FiCopy size={16} /> Copy
              </Button>
              <Button variant="secondary" onClick={handleDownload}>
                <FiDownload size={16} /> Download TXT
              </Button>
              <Button variant="outline" onClick={handleGenerate} disabled={loading}>
                <FiRefreshCw size={16} /> Regenerate
              </Button>
            </div>
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
