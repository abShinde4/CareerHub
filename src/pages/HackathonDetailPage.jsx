import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiMapPin, FiBriefcase, FiDollarSign, FiCalendar } from 'react-icons/fi';
import { getHackathonById } from '../services/hackathonService';
import { mapHackathonToCard } from '../utils/mapOpportunity';
import { formatDate } from '../utils/formatDate';
import DetailPageLayout from '../components/sections/DetailPageLayout';
import SkeletonCard from '../components/ui/SkeletonCard';

export default function HackathonDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hackathon, setHackathon] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHackathonById(id)
      .then(({ data }) => {
        setHackathon(data.data);
        setRelated((data.related || []).map(mapHackathonToCard));
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

  if (!hackathon) return null;

  const card = mapHackathonToCard(hackathon);

  return (
    <DetailPageLayout
      title={`${hackathon.title} by ${hackathon.organizer}`}
      metaDescription={hackathon.description?.slice(0, 160) || `${hackathon.title} hackathon`}
      job={card}
      description={hackathon.description}
      applyLink={hackathon.registrationLink}
      applyLabel="Register Now"
      related={related}
      details={[
        { icon: FiMapPin, label: 'Mode', value: 'Online' },
        { icon: FiDollarSign, label: 'Prize Pool', value: hackathon.prizePool },
        { icon: FiCalendar, label: 'Last Date', value: hackathon.lastDate ? formatDate(hackathon.lastDate) : 'TBA' },
        { icon: FiBriefcase, label: 'Organizer', value: hackathon.organizer },
      ]}
    />
  );
}
