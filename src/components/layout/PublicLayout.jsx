import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/useTheme';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PublicLayout({ children }) {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'gradient-bg-dark text-gray-100' : 'gradient-bg text-gray-900'}`}>
      <Navbar searchQuery={searchQuery} onSearch={handleSearch} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
