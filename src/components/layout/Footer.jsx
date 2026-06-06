import { motion } from 'framer-motion';
import { HiOutlineBriefcase } from 'react-icons/hi2';
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import { useToast } from '../../context/useToast';

const FOOTER_LINKS = [
  { label: 'About Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#privacy' },
  { label: 'Terms & Conditions', href: '#terms' },
  { label: 'Careers', href: '#careers' },
];

const SOCIAL_ICONS = [
  { icon: FaTwitter, label: 'Twitter' },
  { icon: FaLinkedin, label: 'LinkedIn' },
  { icon: FaInstagram, label: 'Instagram' },
  { icon: FaYoutube, label: 'YouTube' },
];

export default function Footer() {
  const { addToast } = useToast();

  return (
    <footer className="mt-16 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-linear-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <HiOutlineBriefcase className="text-white" size={20} />
              </div>
              <span className="text-xl font-extrabold text-gray-900 dark:text-white">
                Career<span className="text-primary-600">Hub</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed max-w-xs">
              Your one-stop destination for jobs, internships, hackathons and career growth opportunities.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      addToast(`${link.label} page coming soon!`, 'info');
                    }}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-4">Follow Us</h4>
            <div className="flex gap-3">
              {SOCIAL_ICONS.map(({ icon: Icon, label }) => (
                <motion.a
                  key={label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    addToast(`Opening ${label}...`, 'info');
                  }}
                  className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-600 transition-colors duration-200"
                  aria-label={label}
                >
                  <Icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} CareerHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
