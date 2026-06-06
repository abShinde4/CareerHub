import { useCallback, useEffect, useMemo, useState } from 'react';
import { getJobs } from '../services/jobService';
import { getInternships } from '../services/internshipService';
import { getHackathons } from '../services/hackathonService';
import { globalSearch } from '../services/searchService';
import { mergeOpportunities, mapJobToCard, mapHackathonToCard } from '../utils/mapOpportunity';

const ITEMS_PER_PAGE = 5;

export function useJobFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarks, setBookmarks] = useState(() => {
    const saved = localStorage.getItem('careerhub-bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  const fetchOpportunities = useCallback(async () => {
    setLoading(true);
    try {
      let merged = [];

      if (searchQuery.trim()) {
        const { data } = await globalSearch({
          q: searchQuery,
          category: activeCategory !== 'all' ? activeCategory : undefined,
        });
        merged = mergeOpportunities(data.data.jobs, data.data.internships, data.data.hackathons);
      } else if (activeCategory === 'internship') {
        const [jobsRes, internRes] = await Promise.all([
          getJobs({ category: 'internship', limit: 50 }),
          getInternships({ limit: 50 }),
        ]);
        merged = mergeOpportunities(jobsRes.data.data, internRes.data.data, []);
      } else if (activeCategory === 'hackathon') {
        const { data } = await getHackathons({ limit: 50 });
        merged = data.data.map(mapHackathonToCard);
      } else if (activeCategory === 'all') {
        const [jobsRes, internRes, hackRes] = await Promise.all([
          getJobs({ limit: 50 }),
          getInternships({ limit: 50 }),
          getHackathons({ limit: 50 }),
        ]);
        merged = mergeOpportunities(jobsRes.data.data, internRes.data.data, hackRes.data.data);
      } else {
        const { data } = await getJobs({ category: activeCategory, limit: 50 });
        merged = data.data.map(mapJobToCard);
      }

      setOpportunities(merged);
    } catch {
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    fetchOpportunities(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [fetchOpportunities]);

  const filteredJobs = opportunities;
  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / ITEMS_PER_PAGE));

  const paginatedJobs = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredJobs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredJobs, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const toggleBookmark = (jobId) => {
    setBookmarks((prev) => {
      const updated = prev.includes(jobId)
        ? prev.filter((id) => id !== jobId)
        : [...prev, jobId];
      localStorage.setItem('careerhub-bookmarks', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    searchQuery,
    activeCategory,
    currentPage,
    bookmarks,
    filteredJobs,
    paginatedJobs,
    totalPages,
    loading,
    itemsPerPage: ITEMS_PER_PAGE,
    setSearchQuery: handleSearch,
    setActiveCategory: handleCategoryChange,
    setCurrentPage,
    toggleBookmark,
    refetch: fetchOpportunities,
  };
}
