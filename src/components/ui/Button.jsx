import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-600/25',
  secondary:
    'bg-white dark:bg-gray-800 text-primary-600 dark:text-primary-400 border border-primary-200 dark:border-primary-800 hover:bg-primary-50 dark:hover:bg-primary-900/30',
  ghost:
    'bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800',
  outline:
    'bg-transparent border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:border-primary-300 hover:text-primary-600',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...props
}) {
  const sizes = {
    sm: 'px-3.5 py-2 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 font-semibold rounded-2xl transition-colors duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
