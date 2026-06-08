import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  FiGrid, FiBriefcase, FiUsers, FiSettings, FiLogOut, FiCode,
  FiMenu, FiX, FiBell, FiImage, FiShare2, FiGlobe, FiBarChart2,
} from 'react-icons/fi';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { useAuth } from '../../context/useAuth';

const NAV = [
  { to: '/admin', icon: FiGrid, label: 'Dashboard', end: true },
  { to: '/admin/jobs', icon: FiBriefcase, label: 'Jobs' },
  { to: '/admin/internships', icon: HiOutlineAcademicCap, label: 'Internships' },
  { to: '/admin/hackathons', icon: FiCode, label: 'Hackathons' },
  { to: '/admin/government-jobs', icon: FiGlobe, label: 'Government Jobs' },
  { to: '/admin/announcements', icon: FiBell, label: 'Announcements' },
  { to: '/admin/hero-highlights', icon: FiImage, label: 'Hero CMS' },
  { to: '/admin/social-links', icon: FiShare2, label: 'Social Links' },
  { to: '/admin/analytics', icon: FiBarChart2, label: 'Analytics' },
  { to: '/admin/subscribers', icon: FiUsers, label: 'Subscribers' },
  { to: '/admin/settings', icon: FiSettings, label: 'Settings' },
];

function SidebarContent({ onNavigate }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <h1 className="text-lg sm:text-xl font-extrabold text-gray-900">
          Career<span className="text-primary-600">Hub</span>
        </h1>
        <p className="text-xs text-gray-500 mt-1">Admin Panel</p>
      </div>
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-600 hover:bg-primary-50 hover:text-primary-600'
              }`
            }
          >
            <Icon size={18} className="shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="p-3 sm:p-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 mb-2 truncate">{admin?.email}</p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 sm:px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <FiLogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col shrink-0 fixed h-full z-30">
        <SidebarContent />
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-72 max-w-[85vw] bg-white flex flex-col h-full shadow-xl">
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-lg text-gray-500 hover:bg-gray-100"
            >
              <FiX size={20} />
            </button>
            <SidebarContent onNavigate={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64 flex flex-col min-w-0">
        <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
          <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg text-gray-600 hover:bg-gray-100">
            <FiMenu size={22} />
          </button>
          <span className="font-bold text-gray-900">Career<span className="text-primary-600">Hub</span> Admin</span>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
