import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

export default function AiToolCard({ icon, title, description, to, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -6 }}
      className="group glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft hover:shadow-soft-lg transition-all duration-300 border border-white/40 dark:border-white/10"
    >
      <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">{description}</p>
      <Link to={to}>
        <Button variant="secondary" className="w-full group-hover:bg-primary-600 group-hover:text-white group-hover:border-primary-600 transition-all">
          Open
        </Button>
      </Link>
    </motion.div>
  );
}
