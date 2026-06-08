import asyncHandler from '../utils/asyncHandler.js';
import Job from '../models/Job.js';
import Internship from '../models/Internship.js';
import Hackathon from '../models/Hackathon.js';
import Subscriber from '../models/Subscriber.js';
import GovernmentJob from '../models/GovernmentJob.js';
import Visitor from '../models/Visitor.js';
import Announcement from '../models/Announcement.js';

export const getDashboardStats = asyncHandler(async (req, res) => {
  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const [
    totalJobs,
    totalInternships,
    totalHackathons,
    totalGovernmentJobs,
    totalSubscribers,
    totalVisitors,
    todayVisitors,
    uniqueVisitors,
  ] = await Promise.all([
    Job.countDocuments(),
    Internship.countDocuments(),
    Hackathon.countDocuments(),
    GovernmentJob.countDocuments(),
    Subscriber.countDocuments(),
    Visitor.countDocuments(),
    Visitor.countDocuments({ createdAt: { $gte: startOfDay } }),
    Visitor.distinct('ipHash'),
  ]);

  const [recentJobs, recentInternships, recentHackathons, recentGovJobs, recentSubscribers, recentAnnouncements] = await Promise.all([
    Job.find().sort({ updatedAt: -1 }).limit(5).select('title company status createdAt updatedAt'),
    Internship.find().sort({ updatedAt: -1 }).limit(5).select('title company status createdAt updatedAt'),
    Hackathon.find().sort({ updatedAt: -1 }).limit(5).select('title organizer status createdAt updatedAt'),
    GovernmentJob.find().sort({ createdAt: -1 }).limit(5).select('title department status createdAt'),
    Subscriber.find().sort({ createdAt: -1 }).limit(5).select('email createdAt'),
    Announcement.find().sort({ updatedAt: -1 }).limit(3).select('text isActive updatedAt'),
  ]);

  const recentActivity = [
    ...recentJobs.map((j) => ({
      type: 'job',
      action: j.createdAt?.getTime() === j.updatedAt?.getTime() ? 'added' : 'updated',
      title: j.title,
      subtitle: j.company,
      status: j.status,
      createdAt: j.updatedAt || j.createdAt,
    })),
    ...recentInternships.map((i) => ({
      type: 'internship',
      action: 'added',
      title: i.title,
      subtitle: i.company,
      status: i.status,
      createdAt: i.createdAt,
    })),
    ...recentHackathons.map((h) => ({
      type: 'hackathon',
      action: 'added',
      title: h.title,
      subtitle: h.organizer,
      status: h.status,
      createdAt: h.createdAt,
    })),
    ...recentGovJobs.map((g) => ({
      type: 'government',
      action: 'added',
      title: g.title,
      subtitle: g.department,
      status: g.status,
      createdAt: g.createdAt,
    })),
    ...recentSubscribers.map((s) => ({
      type: 'subscriber',
      action: 'joined',
      title: s.email,
      subtitle: 'New subscriber',
      status: 'active',
      createdAt: s.createdAt,
    })),
    ...recentAnnouncements.map((a) => ({
      type: 'announcement',
      action: 'updated',
      title: a.text,
      subtitle: a.isActive ? 'Active' : 'Inactive',
      status: a.isActive ? 'published' : 'draft',
      createdAt: a.updatedAt,
    })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 15);

  res.json({
    success: true,
    data: {
      totalJobs,
      totalInternships,
      totalHackathons,
      totalGovernmentJobs,
      totalSubscribers,
      totalVisitors,
      todayVisitors,
      uniqueVisitors: uniqueVisitors.length,
      recentActivity,
    },
  });
});

export const getPublicStats = asyncHandler(async (req, res) => {
  const [jobs, internships, hackathons, govJobs, companies] = await Promise.all([
    Job.countDocuments({ status: 'published' }),
    Internship.countDocuments({ status: 'published' }),
    Hackathon.countDocuments({ status: 'published' }),
    GovernmentJob.countDocuments({ status: 'published' }),
    Job.distinct('company', { status: 'published' }),
  ]);

  res.json({
    success: true,
    data: {
      jobs,
      internships,
      hackathons,
      governmentJobs: govJobs,
      companies: companies.length,
    },
  });
});
