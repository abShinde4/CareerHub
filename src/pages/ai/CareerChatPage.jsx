import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import PublicLayout from '../../components/layout/PublicLayout';
import SEO from '../../components/ui/SEO';
import Button from '../../components/ui/Button';
import ChatMessage from '../../components/ai/ChatMessage';
import AiStatusBanner from '../../components/ai/AiStatusBanner';
import { useAiStatus } from '../../hooks/useAiStatus';
import { sendChatMessage } from '../../services/aiService';
import { getVisitorName } from '../../utils/visitorName';

const SUGGESTED_PROMPTS = [
  'How do I become Frontend Developer?',
  'Review my roadmap',
  'Interview preparation',
  'Salary guidance',
  'Career advice',
];

export default function CareerChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const bottomRef = useRef(null);
  const visitorName = getVisitorName();
  const { aiAvailable, aiUnavailable, statusLoading, statusMessage } = useAiStatus();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const content = text.trim();
    if (!content || loading) return;

    if (aiUnavailable) {
      setError('AI Service unavailable');
      return;
    }

    setError('');
    const userMsg = { role: 'user', content };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const { data } = await sendChatMessage(updated, visitorName || 'User');
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message || 'Failed to send message. Please try again.';
      setError(msg);
      if (status === 503) {
        setError('AI Service unavailable');
      }
    } finally {
      setLoading(false);
    }
  };

  const greeting = visitorName ? `Welcome, ${visitorName} 👋` : null;

  return (
    <PublicLayout>
      <SEO
        title="AI Career Chat | CareerHub"
        description="Chat with CareerHub AI for career advice, interview prep, and salary guidance."
        path="/ai-tools/career-chat"
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col min-h-[calc(100vh-200px)]">
        <div className="flex items-center gap-3 mb-6">
          <Link to="/ai-tools" className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <FiArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">🤖 AI Career Chat</h1>
            {greeting && <p className="text-sm text-primary-600 dark:text-primary-400">{greeting}</p>}
          </div>
        </div>

        <AiStatusBanner
          statusLoading={statusLoading}
          aiAvailable={aiAvailable}
          statusMessage={statusMessage}
        />

        <div className="flex-1 glass dark:glass-dark rounded-3xl p-4 sm:p-6 shadow-soft overflow-y-auto max-h-[50vh] sm:max-h-[55vh] mb-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                Ask me anything about your career journey!
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTED_PROMPTS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={loading || aiUnavailable || statusLoading}
                    className="px-3 py-2 text-xs sm:text-sm rounded-xl bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <ChatMessage key={i} role={msg.role} content={msg.content} />
          ))}

          {loading && (
            <div className="flex justify-start mb-4">
              <div className="glass dark:glass-dark px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-500"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {error && (
          <p className="text-sm text-red-500 mb-2">{error}</p>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage(input)}
            placeholder="Type your message..."
            disabled={loading || aiUnavailable || statusLoading}
            className="flex-1 px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50"
          />
          <Button onClick={() => sendMessage(input)} disabled={loading || !input.trim() || aiUnavailable || statusLoading}>
            <FiSend size={18} />
          </Button>
        </div>
      </div>
    </PublicLayout>
  );
}
