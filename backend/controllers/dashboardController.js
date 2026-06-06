import asyncHandler from '../utils/asyncHandler.js';
import Job from '../models/Job.js';
import Internship from '../models/Internship.js';
import Hackathon from '../models/Hackathon.js';
import Subscriber from '../models/Subscriber.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [totalJobs, totalInternships, totalHackathons, totalSubscribers] = await Promise.all([
    Job.countDocuments(),
    Internship.countDocuments(),
    Hackathon.countDocuments(),
    Subscriber.countDocuments(),
  ]);

  const [recentJobs, recentInternships, recentHackathons, recentSubscribers] = await Promise.all([
    Job.find().sort({ createdAt: -1 }).limit(5).select('title company status createdAt'),
    Internship.find().sort({ createdAt: -1 }).limit(5).select('title company status createdAt'),
    Hackathon.find().sort({ createdAt: -1 }).limit(5).select('title organizer status createdAt'),
    Subscriber.find().sort({ createdAt: -1 }).limit(5).select('email createdAt'),
  ]);

  const recentActivity = [
    ...recentJobs.map((j) => ({ type: 'job', title: j.title, subtitle: j.company, status: j.status, createdAt: j.createdAt })),
    ...recentInternships.map((i) => ({ type: 'internship', title: i.title, subtitle: i.company, status: i.status, createdAt: i.createdAt })),
    ...recentHackathons.map((h) => ({ type: 'hackathon', title: h.title, subtitle: h.organizer, status: h.status, createdAt: h.createdAt })),
    ...recentSubscribers.map((s) => ({ type: 'subscriber', title: s.email, subtitle: 'New subscriber', status: 'active', createdAt: s.createdAt })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 10);

  res.json({
    success: true,
    data: {
      totalJobs,
      totalInternships,
      totalHackathons,
      totalSubscribers,
      recentActivity,
    },
  });
});

export const getPublicStats = asyncHandler(async (req, res) => {
  const [jobs, internships, hackathons, companies] = await Promise.all([
    Job.countDocuments({ status: 'published' }),
    Internship.countDocuments({ status: 'published' }),
    Hackathon.countDocuments({ status: 'published' }),
    Job.distinct('company', { status: 'published' }),
  ]);

  res.json({
    success: true,
    data: {
      jobs,
      internships,
      hackathons,
      companies: companies.length,
    },
  });
});
