import { timeAgo } from './formatDate';

const CATEGORY_TYPE_MAP = {
  'full-time': 'Full Time',
  internship: 'Internship',
  wfh: 'Work From Home',
  hackathon: 'Hackathon',
  fresher: 'Fresher',
  'part-time': 'Part Time',
  government: 'Government',
};

const favicon = (company) =>
  `https://www.google.com/s2/favicons?domain=${company.toLowerCase().replace(/\s+/g, '')}.com&sz=64`;

export const mapJobToCard = (job) => ({
  id: job._id,
  title: job.title,
  company: job.company,
  logo: job.companyLogo || favicon(job.company),
  location: job.location,
  salary: job.salary,
  experience: job.experience,
  type: CATEGORY_TYPE_MAP[job.category] || 'Full Time',
  category: job.category,
  postedAt: timeAgo(job.createdAt),
  opportunityType: 'job',
  applyLink: job.applyLink,
  isFeatured: job.isFeatured,
  createdAt: job.createdAt,
});

export const mapInternshipToCard = (internship) => ({
  id: internship._id,
  title: internship.title,
  company: internship.company,
  logo: favicon(internship.company),
  location: internship.location,
  salary: internship.stipend,
  experience: internship.duration,
  type: 'Internship',
  category: 'internship',
  postedAt: timeAgo(internship.createdAt),
  opportunityType: 'internship',
  applyLink: internship.applyLink,
  createdAt: internship.createdAt,
});

export const mapHackathonToCard = (hackathon) => ({
  id: hackathon._id,
  title: hackathon.title,
  company: hackathon.organizer,
  logo: favicon(hackathon.organizer),
  location: 'Online',
  salary: hackathon.prizePool,
  experience: 'Open to All',
  type: 'Hackathon',
  category: 'hackathon',
  postedAt: timeAgo(hackathon.createdAt),
  opportunityType: 'hackathon',
  applyLink: hackathon.registrationLink,
  createdAt: hackathon.createdAt,
});

export const mapGovernmentJobToCard = (job) => ({
  id: job._id,
  title: job.title,
  company: job.department,
  logo: job.image || favicon(job.department),
  location: job.location,
  salary: job.salary || 'As per rules',
  experience: job.qualification || 'See notification',
  type: 'Government',
  category: 'government',
  postedAt: timeAgo(job.createdAt),
  opportunityType: 'government',
  applyLink: job.officialWebsite,
  createdAt: job.createdAt,
});

export const mergeOpportunities = (jobs = [], internships = [], hackathons = [], govJobs = []) => {
  const merged = [
    ...jobs.map(mapJobToCard),
    ...internships.map(mapInternshipToCard),
    ...hackathons.map(mapHackathonToCard),
    ...govJobs.map(mapGovernmentJobToCard),
  ];
  return merged.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const formatStat = (num) => {
  if (num >= 1000) return `${Math.floor(num / 1000)}K+`;
  return `${num}+`;
};
