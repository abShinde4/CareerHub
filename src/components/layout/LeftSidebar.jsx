import { motion } from 'framer-motion';
import {
  FiGrid,
  FiBriefcase,
  FiHome,
  FiCode,
  FiStar,
  FiClock,
  FiGlobe,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { CATEGORIES } from '../../data/jobs';

const iconMap = {
  grid: FiGrid,
  briefcase: FiBriefcase,
  graduation: HiOutlineAcademicCap,
  home: FiHome,
  code: FiCode,
  star: FiStar,
  clock: FiClock,
  building: FiGlobe,
};

export default function LeftSidebar({ activeCategory, onCategoryChange }) {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="sticky top-24 glass dark:glass-dark rounded-3xl p-4 shadow-soft">
        <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider px-3 mb-3">
          Categories
        </h2>
        <nav className="space-y-1">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon];
            const isActive = activeCategory === cat.id;
            return (
              <motion.button
                key={cat.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onCategoryChange(cat.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary-600 text-white shadow-md shadow-primary-600/25'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:text-primary-600 dark:hover:text-primary-400'
                }`}
              >
                <Icon size={18} />
                {cat.label}
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
