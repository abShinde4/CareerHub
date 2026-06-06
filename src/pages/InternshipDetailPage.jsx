import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign } from 'react-icons/fi';
import { getInternshipById } from '../services/internshipService';
import { mapInternshipToCard } from '../utils/mapOpportunity';
import DetailPageLayout from '../components/sections/DetailPageLayout';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function InternshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [internship, setInternship] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getInternshipById(id)
      .then(({ data }) => {
        setInternship(data.data);
        setRelated((data.related || []).map(mapInternshipToCard));
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

  if (!internship) return null;

  const card = mapInternshipToCard(internship);

  return (
    <DetailPageLayout
      title={`${internship.title} at ${internship.company}`}
      metaDescription={internship.description?.slice(0, 160) || `${internship.title} internship`}
      job={card}
      description={internship.description}
      applyLink={internship.applyLink}
      related={related}
      details={[
        { icon: FiMapPin, label: 'Location', value: internship.location },
        { icon: FiDollarSign, label: 'Stipend', value: internship.stipend },
        { icon: FiBriefcase, label: 'Duration', value: internship.duration },
      ]}
    />
  );
}
