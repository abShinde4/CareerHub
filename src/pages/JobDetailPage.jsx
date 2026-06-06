import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { getJobById } from '../services/jobService';
import { mapJobToCard } from '../utils/mapOpportunity';
import DetailPageLayout from '../components/sections/DetailPageLayout';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function JobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobById(id)
      .then(({ data }) => {
        setJob(data.data);
        setRelated((data.related || []).map(mapJobToCard));
      })
      .catch(() => navigate('/'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-bg p-8 max-w-4xl mx-auto">
        <SkeletonCard />
      </div>
    );
  }

  if (!job) return null;

  const card = mapJobToCard(job);

  return (
    <DetailPageLayout
      title={`${job.title} at ${job.company}`}
      metaDescription={job.description?.slice(0, 160) || `${job.title} at ${job.company}`}
      job={card}
      description={job.description}
      skills={job.skills}
      applyLink={job.applyLink}
      related={related}
      details={[
        { icon: FiMapPin, label: 'Location', value: job.location },
        { icon: FiDollarSign, label: 'Salary', value: job.salary },
        { icon: FiBriefcase, label: 'Experience', value: job.experience },
      ]}
    />
  );
}
