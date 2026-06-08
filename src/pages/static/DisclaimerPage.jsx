import PublicLayout from '../../components/layout/PublicLayout';
import StaticPageHeader from '../../components/layout/StaticPageHeader';
import SEO from '../../components/ui/SEO';

const SECTIONS = [
  { title: 'General Information', content: 'The information provided on CareerHub is for general informational purposes only. While we strive to keep listings accurate and up to date, we make no warranties about completeness, reliability, or accuracy.' },
  { title: 'Job Listings', content: 'CareerHub aggregates job, internship, hackathon, and government job listings from various sources. We do not guarantee the availability, authenticity, or outcome of any opportunity listed on the platform.' },
  { title: 'External Links', content: 'Our website contains links to third-party websites. CareerHub has no control over the content or practices of these sites and accepts no responsibility for them.' },
  { title: 'No Professional Advice', content: 'Content on CareerHub does not constitute career, legal, or financial advice. Users should verify all information independently before making career decisions.' },
  { title: 'Limitation of Liability', content: 'CareerHub shall not be liable for any loss or damage arising from the use of this website, including missed opportunities, incorrect listings, or reliance on published content.' },
  { title: 'Contact', content: 'For questions regarding this disclaimer, contact us at support@careerhub.com.' },
];

export default function DisclaimerPage() {
  return (
    <PublicLayout>
      <SEO title="Disclaimer | CareerHub" description="CareerHub disclaimer — important legal information about our job portal." path="/disclaimer" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        <StaticPageHeader title="Disclaimer" subtitle="Important legal information about using CareerHub." />
        <div className="space-y-5">
          {SECTIONS.map((s) => (
            <div key={s.title} className="glass dark:glass-dark rounded-3xl p-5 sm:p-8 shadow-soft">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">{s.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm sm:text-base">{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </PublicLayout>
  );
}
