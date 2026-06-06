import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import JobsManagement from './pages/admin/JobsManagement';
import InternshipsManagement from './pages/admin/InternshipsManagement';
import HackathonsManagement from './pages/admin/HackathonsManagement';
import SubscribersManagement from './pages/admin/SubscribersManagement';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/internship/:id" element={<InternshipDetailPage />} />
        <Route path="/hackathon/:id" element={<HackathonDetailPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<JobsManagement />} />
          <Route path="internships" element={<InternshipsManagement />} />
          <Route path="hackathons" element={<HackathonsManagement />} />
          <Route path="subscribers" element={<SubscribersManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
