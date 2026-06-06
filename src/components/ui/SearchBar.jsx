import { FiSearch } from 'react-icons/fi';

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search jobs, companies, skills...',
  size = 'md',
  className = '',
}) {
  const sizes = {
    sm: 'py-2.5 text-sm',
    md: 'py-3 text-sm',
    lg: 'py-4 text-base',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex-1 ${className}`}>
      <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full pl-12 pr-4 ${sizes[size]} rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 transition-all duration-200`}
      />
    </form>
  );
}
