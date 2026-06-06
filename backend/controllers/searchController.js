import asyncHandler from '../utils/asyncHandler.js';
import Job from '../models/Job.js';
import Internship from '../models/Internship.js';
import Hackathon from '../models/Hackathon.js';

export const globalSearch = asyncHandler(async (req, res) => {
  const q = req.query.q || req.query.search || '';
  const category = req.query.category;
  const location = req.query.location;
  const experience = req.query.experience;
  const company = req.query.company;

  if (!q && !category && !location && !experience && !company) {
    return res.json({ success: true, data: { jobs: [], internships: [], hackathons: [] } });
  }

  const jobFilter = { status: 'published' };
  const internshipFilter = { status: 'published' };
  const hackathonFilter = { status: 'published' };

  if (q) {
    const regex = { $regex: q, $options: 'i' };
    jobFilter.$or = [{ title: regex }, { company: regex }, { location: regex }, { skills: regex }];
    internshipFilter.$or = [{ title: regex }, { company: regex }, { location: regex }];
    hackathonFilter.$or = [{ title: regex }, { organizer: regex }];
  }
  if (category) jobFilter.category = category;
  if (location) {
    jobFilter.location = { $regex: location, $options: 'i' };
    internshipFilter.location = { $regex: location, $options: 'i' };
  }
  if (experience) jobFilter.experience = { $regex: experience, $options: 'i' };
  if (company) {
    jobFilter.company = { $regex: company, $options: 'i' };
    internshipFilter.company = { $regex: company, $options: 'i' };
    hackathonFilter.organizer = { $regex: company, $options: 'i' };
  }

  const [jobs, internships, hackathons] = await Promise.all([
    category === 'hackathon' ? [] : Job.find(jobFilter).sort({ createdAt: -1 }).limit(20),
    category && category !== 'internship' ? [] : Internship.find(internshipFilter).sort({ createdAt: -1 }).limit(20),
    category && category !== 'hackathon' ? [] : Hackathon.find(hackathonFilter).sort({ createdAt: -1 }).limit(20),
  ]);

  res.json({ success: true, data: { jobs, internships, hackathons } });
});
