import { useState } from 'react';
import { FiSend } from 'react-icons/fi';
import { useToast } from '../../context/useToast';
import { subscribe } from '../../services/subscriberService';
import Button from './Button';

export default function NewsletterForm({ onSuccess, className = '' }) {
  const [email, setEmail] = useState('');
  const { addToast } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      addToast('Please enter your email address', 'info');
      return;
    }
    try {
      await subscribe(email.trim());
      addToast('Successfully subscribed to daily updates!', 'success');
      setEmail('');
      onSuccess?.();
    } catch {
      addToast('Subscription failed. Please try again.', 'info');
    }
  };

  return (
    <form onSubmit={handleSubscribe} className={`space-y-3 ${className}`}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-2.5 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all"
      />
      <Button type="submit" size="sm" className="w-full">
        <FiSend size={16} />
        Subscribe
      </Button>
    </form>
  );
}
