import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid,
  FiBriefcase,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiCode,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { useAuth } from '../../context/useAuth';

const NAV = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', end: true },
  { to: '/admin/jobs', icon: FiBriefcase, label: 'Jobs' },
  { to: '/admin/internships', icon: HiOutlineAcademicCap, label: 'Internships' },
  { to: '/admin/hackathons', icon: FiCode, label: 'Hackathons' },
  { to: '/admin/subscribers', icon: FiUsers, label: 'Subscribers' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
];

export default function AdminLayout() {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-extrabold text-gray-900">
            Career<span className="text-primary-600">Hub</span>
          </h1>
          <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {NAV.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2 truncate">{admin?.email}</p>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
