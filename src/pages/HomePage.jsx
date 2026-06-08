import { useTheme } from '../context/useTheme';
import { useJobFilters } from '../hooks/useJobFilters';
import Navbar from '../components/layout/Navbar';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import LeftSidebar from '../components/layout/LeftSidebar';
import RightSidebar from '../components/layout/RightSidebar';
import JobList from '../components/sections/JobList';
import Footer from '../components/layout/Footer';
import YouTubeSection from '../components/sections/YouTubeSection';
import SEO from '../components/ui/SEO';

export default function HomePage() {
  const { darkMode } = useTheme();
  const {
    searchQuery,
    activeCategory,
    currentPage,
    bookmarks,
    filteredJobs,
    paginatedJobs,
    totalPages,
    loading,
    setSearchQuery,
    setActiveCategory,
    setCurrentPage,
    toggleBookmark,
  } = useJobFilters();

  const handleTrendingClick = (term) => {
    setSearchQuery(term);
    document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <SEO
        title="CareerHub - Find Jobs, Internships & Opportunities"
        description="Daily updates of latest jobs, internships, hackathons and career opportunities from top companies."
        path="/"
      />

      <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'gradient-bg-dark text-gray-100' : 'gradient-bg text-gray-900'}`}>
        <Navbar searchQuery={searchQuery} onSearch={setSearchQuery} />

        <main>
          <Hero searchQuery={searchQuery} onSearch={setSearchQuery} />
          <Stats />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <div className="flex gap-6 xl:gap-8">
              <LeftSidebar
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              <JobList
                jobs={paginatedJobs}
                totalJobs={filteredJobs.length}
                bookmarks={bookmarks}
                currentPage={currentPage}
                totalPages={totalPages}
                activeCategory={activeCategory}
                searchQuery={searchQuery}
                loading={loading}
                onPageChange={setCurrentPage}
                onCategoryChange={setActiveCategory}
                onBookmark={toggleBookmark}
              />

              <RightSidebar onTrendingClick={handleTrendingClick} />
            </div>
          </div>
          <YouTubeSection />
        </main>

        <Footer />
      </div>
    </>
  );
}
