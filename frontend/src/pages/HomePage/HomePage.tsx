import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePokemonList } from '../../hooks/usePokemonList';
import { PokemonList } from '../../components/PokemonList/PokemonList';
import { SearchBar } from '../../components/SearchBar/SearchBar';
import { SortModal } from '../../components/SortModal/SortModal';
import { Logo } from '../../components/Logo/Logo';
import { removeToken } from '../../services/auth';
import type { SortOption } from '../../types/pokemon';
import './HomePage.css';

export const HomePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('number');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const { pokemonList, loading, error } = usePokemonList(sortBy);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="home-page__loading">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <div className="home-page__error">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <div className="home-page__header-content">
          <div className="home-page__logo">
            <Logo size={32} showText={true} />
          </div>
          <div className="home-page__search-container">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <button
              className="home-page__sort-button"
              onClick={() => setIsSortModalOpen(true)}
              aria-label="Sort"
            >
              <img 
                src="/images/tag.svg" 
                alt="Sort" 
                className="home-page__sort-button-icon"
              />
            </button>
            <button
              className="home-page__logout-button"
              onClick={handleLogout}
              aria-label="Logout"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9M16 17L21 12M21 12L16 7M21 12H9"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <main className="home-page__main">
        <PokemonList pokemonList={pokemonList} searchQuery={searchQuery} />
      </main>
      <SortModal
        isOpen={isSortModalOpen}
        onClose={() => setIsSortModalOpen(false)}
        selectedSort={sortBy}
        onSortChange={setSortBy}
      />
    </div>
  );
};

