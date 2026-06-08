import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import { FaTelegram, FaWhatsapp, FaInstagram, FaYoutube } from 'react-icons/fa';
import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';
import Button from '../../components/ui/Button';
import { useToast } from '../../context/useToast';

const SOCIAL_LINKS = [
  { name: 'Telegram', icon: FaTelegram, color: 'bg-sky-500 hover:bg-sky-600', href: 'https://t.me/careerhub' },
  { name: 'WhatsApp', icon: FaWhatsapp, color: 'bg-green-500 hover:bg-green-600', href: 'https://wa.me/careerhub' },
  { name: 'Instagram', icon: FaInstagram, color: 'bg-pink-500 hover:bg-pink-600', href: 'https://instagram.com/careerhub' },
  { name: 'YouTube', icon: FaYoutube, color: 'bg-red-500 hover:bg-red-600', href: 'https://youtube.com/@careerhub' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    addToast('Message sent successfully! We will get back to you soon.', 'success');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  const inputClass =
    'w-full px-4 py-3 text-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 transition-all';

  return (
    <PublicLayout>
      <Helmet>
        <title>Contact Us | CareerHub</title>
        <meta name="description" content="Get in touch with CareerHub. Reach our support team for queries about jobs, internships, and partnerships." />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <StaticPageHeader
          title="Contact Us"
          subtitle="Have a question, suggestion, or partnership inquiry? We'd love to hear from you."
        />

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="lg:col-span-3 glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg space-y-4"
          >
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Send a Message</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required className={inputClass} placeholder="you@email.com" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Subject</label>
              <input name="subject" value={form.subject} onChange={handleChange} required className={inputClass} placeholder="How can we help?" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Message</label>
              <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className={inputClass} placeholder="Write your message..." />
            </div>
            <Button type="submit" disabled={loading}>
              <FiSend size={16} />
              {loading ? 'Sending...' : 'Send Message'}
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="glass dark:glass-dark rounded-3xl p-6 shadow-soft">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Contact Details</h2>
              <div className="space-y-4">
                <a href="mailto:support@careerhub.com" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors">
                  <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/40">
                    <FiMail className="text-primary-600" size={18} />
                  </div>
                  <span className="text-sm font-medium">support@careerhub.com</span>
                </a>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                  <div className="p-2.5 rounded-xl bg-primary-100 dark:bg-primary-900/40">
                    <FiMapPin className="text-primary-600" size={18} />
                  </div>
                  <span className="text-sm">India</span>
                </div>
              </div>
            </div>

            <div className="glass dark:glass-dark rounded-3xl p-6 shadow-soft">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Connect With Us</h2>
              <div className="grid grid-cols-2 gap-2.5">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-2xl text-white text-sm font-semibold ${social.color} transition-colors`}
                  >
                    <social.icon size={18} />
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PublicLayout>
  );
}
