import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { useTheme } from '../../context/useTheme';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import JobCard from '../ui/JobCard';

export default function DetailPageLayout({
  title,
  metaDescription,
  backLabel = 'Back to opportunities',
  job,
  details = [],
  description,
  skills,
  applyLink,
  applyLabel = 'Apply Now',
  related = [],
  onBookmark,
  bookmarks = [],
}) {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const handleRelatedApply = (item) => {
    const routes = {
      job: `/job/${item.id}`,
      internship: `/internship/${item.id}`,
      hackathon: `/hackathon/${item.id}`,
    };
    navigate(routes[item.opportunityType] || `/job/${item.id}`);
  };

  return (
    <>
      <Helmet>
        <title>{title} | CareerHub</title>
        <meta name="description" content={metaDescription} />
      </Helmet>

      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'gradient-bg-dark text-gray-100' : 'gradient-bg text-gray-900'}`}>
        <Navbar searchQuery="" onSearch={() => {}} />

        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary-600 hover:text-primary-700 mb-6"
          >
            <FiArrowLeft size={16} />
            {backLabel}
          </Link>

          <div className="glass dark:glass-dark rounded-3xl p-6 sm:p-8 shadow-soft-lg">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center shrink-0 shadow-sm overflow-hidden">
                <img src={job.logo} alt="" className="w-10 h-10 object-contain" />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">{job.title}</h1>
                <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">{job.company}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge type={job.type} />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-6">
              {details.map((d) => (
                <div key={d.label} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <d.icon size={16} className="text-primary-400 shrink-0" />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{d.label}:</span> {d.value}
                </div>
              ))}
            </div>

            {description && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Description</h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}

            {skills?.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {applyLink && (
              <div className="mt-8">
                <a href={applyLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg">
                    <FiExternalLink size={18} />
                    {applyLabel}
                  </Button>
                </a>
              </div>
            )}
          </div>

          {related.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Related Opportunities</h2>
              <div className="space-y-4">
                {related.map((item, i) => (
                  <JobCard
                    key={item.id}
                    job={item}
                    index={i}
                    isBookmarked={bookmarks.includes(item.id)}
                    onBookmark={onBookmark || (() => {})}
                    onApply={handleRelatedApply}
                  />
                ))}
              </div>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}
