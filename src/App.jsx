import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PageTracker from './components/PageTracker';
import HomePage from './pages/HomePage';
import JobDetailPage from './pages/JobDetailPage';
import InternshipDetailPage from './pages/InternshipDetailPage';
import HackathonDetailPage from './pages/HackathonDetailPage';
import GovernmentJobsPage from './pages/GovernmentJobsPage';
import GovernmentJobDetailPage from './pages/GovernmentJobDetailPage';
import AboutPage from './pages/static/AboutPage';
import ContactPage from './pages/static/ContactPage';
import PrivacyPolicyPage from './pages/static/PrivacyPolicyPage';
import TermsPage from './pages/static/TermsPage';
import CareersPage from './pages/static/CareersPage';
import DisclaimerPage from './pages/static/DisclaimerPage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import JobsManagement from './pages/admin/JobsManagement';
import InternshipsManagement from './pages/admin/InternshipsManagement';
import HackathonsManagement from './pages/admin/HackathonsManagement';
import GovernmentJobsManagement from './pages/admin/GovernmentJobsManagement';
import AnnouncementsManagement from './pages/admin/AnnouncementsManagement';
import HeroHighlightsManagement from './pages/admin/HeroHighlightsManagement';
import SocialLinksManagement from './pages/admin/SocialLinksManagement';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SubscribersManagement from './pages/admin/SubscribersManagement';
import Settings from './pages/admin/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <PageTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/job/:id" element={<JobDetailPage />} />
        <Route path="/internship/:id" element={<InternshipDetailPage />} />
        <Route path="/hackathon/:id" element={<HackathonDetailPage />} />
        <Route path="/government-jobs" element={<GovernmentJobsPage />} />
        <Route path="/government-job/:id" element={<GovernmentJobDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/disclaimer" element={<DisclaimerPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<JobsManagement />} />
          <Route path="internships" element={<InternshipsManagement />} />
          <Route path="hackathons" element={<HackathonsManagement />} />
          <Route path="government-jobs" element={<GovernmentJobsManagement />} />
          <Route path="announcements" element={<AnnouncementsManagement />} />
          <Route path="hero-highlights" element={<HeroHighlightsManagement />} />
          <Route path="social-links" element={<SocialLinksManagement />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="subscribers" element={<SubscribersManagement />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
