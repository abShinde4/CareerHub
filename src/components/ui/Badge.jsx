const typeStyles = {
  'Full Time': 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300',
  Internship: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300',
  Fresher: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300',
  'Work From Home': 'bg-teal-100 text-teal-700 dark:bg-teal-900/40 dark:text-teal-300',
  Hackathon: 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-300',
  'Part Time': 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300',
  Government: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
};

export default function Badge({ type }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
        typeStyles[type] || 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
      }`}
    >
      {type}
    </span>
  );
}
