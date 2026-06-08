import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { getGovernmentJobById } from '../services/governmentJobService';
import { mapGovernmentJobToCard } from '../utils/mapOpportunity';
import { formatDate } from '../utils/formatDate';
import DetailPageLayout from '../components/sections/DetailPageLayout';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function GovernmentJobDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGovernmentJobById(id)
      .then(({ data }) => {
        setJob(data.data);
        setRelated((data.related || []).map(mapGovernmentJobToCard));
      })
      .catch(() => navigate('/government-jobs'))
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return <div className="min-h-screen gradient-bg p-4 sm:p-8 max-w-4xl mx-auto"><SkeletonCard /></div>;
  }
  if (!job) return null;

  const card = mapGovernmentJobToCard(job);

  return (
    <DetailPageLayout
      title={`${job.title} - ${job.department}`}
      metaDescription={job.description?.slice(0, 160) || `${job.title} government job`}
      job={card}
      description={job.description}
      applyLink={job.officialWebsite}
      applyLabel="Visit Official Website"
      related={related}
      details={[
        { icon: FiMapPin, label: 'Location', value: job.location },
        { icon: FiDollarSign, label: 'Salary', value: job.salary || 'As per rules' },
        { icon: FiBriefcase, label: 'Qualification', value: job.qualification || 'See notification' },
        { icon: FiBriefcase, label: 'Vacancies', value: job.totalVacancies || 'N/A' },
        { icon: FiCalendar, label: 'Apply Before', value: job.applicationEndDate ? formatDate(job.applicationEndDate) : 'TBA' },
      ]}
    />
  );
}
