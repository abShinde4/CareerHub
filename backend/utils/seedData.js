import '../config/loadEnv.js';
import mongoose from 'mongoose';
import Job from '../models/Job.js';
import Internship from '../models/Internship.js';
import Hackathon from '../models/Hackathon.js';

const jobs = [
  { title: 'Software Engineer', company: 'Google', companyLogo: 'https://www.google.com/s2/favicons?domain=google.com&sz=64', location: 'Bangalore, India', salary: '₹25–40 LPA', experience: '2–5 years', category: 'full-time', applyLink: 'https://careers.google.com', description: 'Build scalable systems at Google.', skills: ['Java', 'Python', 'System Design'], isFeatured: true, status: 'published' },
  { title: 'Software Developer', company: 'Microsoft', companyLogo: 'https://www.google.com/s2/favicons?domain=microsoft.com&sz=64', location: 'Hyderabad, India', salary: '₹18–32 LPA', experience: '1–4 years', category: 'full-time', applyLink: 'https://careers.microsoft.com', description: 'Join Microsoft engineering team.', skills: ['C#', '.NET', 'Azure'], status: 'published' },
  { title: 'NQT Hiring', company: 'TCS', companyLogo: 'https://www.google.com/s2/favicons?domain=tcs.com&sz=64', location: 'Pan India', salary: '₹3.5–7 LPA', experience: 'Fresher', category: 'fresher', applyLink: 'https://www.tcs.com/careers', description: 'TCS National Qualifier Test hiring.', skills: ['Aptitude', 'Programming'], status: 'published' },
  { title: 'Frontend Developer', company: 'Razorpay', companyLogo: 'https://www.google.com/s2/favicons?domain=razorpay.com&sz=64', location: 'Remote', salary: '₹15–25 LPA', experience: '2–4 years', category: 'wfh', applyLink: 'https://razorpay.com/jobs', description: 'Build payment UIs.', skills: ['React', 'TypeScript'], status: 'published' },
];

const internships = [
  { title: 'Product Intern', company: 'Zoho', stipend: '₹30K/month', duration: '6 months', location: 'Chennai, India', applyLink: 'https://www.zoho.com/careers', description: 'Product management internship.', status: 'published' },
  { title: 'Data Analyst Intern', company: 'Flipkart', stipend: '₹40K/month', duration: '3 months', location: 'Bangalore, India', applyLink: 'https://www.flipkartcareers.com', description: 'Analyze e-commerce data.', status: 'published' },
];

const hackathons = [
  { title: 'AI Hackathon 2026', organizer: 'HackIndia', prizePool: '₹5L Prize Pool', registrationLink: 'https://hackindia.io', lastDate: new Date('2026-08-01'), description: 'Build AI solutions for India.', status: 'published' },
];

const seedData = async () => {
  const mongoUri = process.env.MONGO_URI;
  console.log('MONGO_URI:', mongoUri);

  if (!mongoUri) {
    console.error('MONGO_URI is undefined. Create backend/.env first.');
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected Successfully');
    await Job.deleteMany({});
    await Internship.deleteMany({});
    await Hackathon.deleteMany({});
    await Job.insertMany(jobs);
    await Internship.insertMany(internships);
    await Hackathon.insertMany(hackathons);
    console.log('Sample data seeded');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seedData();
