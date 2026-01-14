import { useNavigate } from 'react-router-dom';
import type { Pokemon } from '../../types/pokemon';
import { formatPokemonNumber, formatPokemonName } from '../../utils/formatting';
import { getPrimaryTypeColor } from '../../utils/colors';
import './PokemonHeader.css';

interface PokemonHeaderProps {
  pokemon: Pokemon;
  onPrevious?: () => void;
  onNext?: () => void;
}

export const PokemonHeader = ({ pokemon, onPrevious, onNext }: PokemonHeaderProps) => {
  const navigate = useNavigate();
  const primaryColor = getPrimaryTypeColor(pokemon.types);
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default;

  return (
    <div className="pokemon-header" style={{ backgroundColor: primaryColor }}>
      <div className="pokemon-header__nav">
        <button
          className="pokemon-header__back-button"
          onClick={() => navigate('/')}
          aria-label="Back"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 18L9 12L15 6"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="pokemon-header__name">{formatPokemonName(pokemon.name)}</h1>
        <div className="pokemon-header__number">{formatPokemonNumber(pokemon.id)}</div>
      </div>
      <div className="pokemon-header__image-container">
        {onPrevious && (
          <button
            className="pokemon-header__nav-arrow pokemon-header__nav-arrow--left"
            onClick={onPrevious}
            aria-label="Previous Pokemon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18L9 12L15 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div className="pokemon-header__image">
          <img src={imageUrl} alt={pokemon.name} />
        </div>
        {onNext && (
          <button
            className="pokemon-header__nav-arrow pokemon-header__nav-arrow--right"
            onClick={onNext}
            aria-label="Next Pokemon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18L15 12L9 6"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

