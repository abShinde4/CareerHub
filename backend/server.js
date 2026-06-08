import './config/loadEnv.js';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import adminRoutes from './routes/adminRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import hackathonRoutes from './routes/hackathonRoutes.js';
import subscriberRoutes from './routes/subscriberRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import statsRoutes from './routes/statsRoutes.js';
import talentRoutes from './routes/talentRoutes.js';
import announcementRoutes from './routes/announcementRoutes.js';
import heroHighlightRoutes from './routes/heroHighlightRoutes.js';
import socialLinksRoutes from './routes/socialLinksRoutes.js';
import governmentJobRoutes from './routes/governmentJobRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/health', (req, res) => res.json({ success: true, message: 'CareerHub API running' }));

app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/hackathons', hackathonRoutes);
app.use('/api/subscribers', subscriberRoutes);
app.use('/api/subscribe', subscriberRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/talent-community', talentRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/hero-highlights', heroHighlightRoutes);
app.use('/api/social-links', socialLinksRoutes);
app.use('/api/government-jobs', governmentJobRoutes);
app.use('/api/analytics', analyticsRoutes);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
