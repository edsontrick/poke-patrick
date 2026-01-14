import { useParams, useNavigate } from 'react-router-dom';
import { usePokemon } from '../../hooks/usePokemon';
import { PokemonHeader } from '../../components/PokemonHeader/PokemonHeader';
import { TypeBadge } from '../../components/TypeBadge/TypeBadge';
import { AboutSection } from '../../components/AboutSection/AboutSection';
import { BaseStatsSection } from '../../components/BaseStatsSection/BaseStatsSection';
import { getPrimaryTypeColor } from '../../utils/colors';
import './PokemonDetailPage.css';

export const PokemonDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { pokemon, description, loading, error } = usePokemon(id || '');

  const handlePrevious = () => {
    if (pokemon && pokemon.id > 1) {
      navigate(`/pokemon/${pokemon.id - 1}`);
    }
  };

  const handleNext = () => {
    if (pokemon && pokemon.id < 151) {
      navigate(`/pokemon/${pokemon.id + 1}`);
    }
  };

  if (loading) {
    return (
      <div className="pokemon-detail-page">
        <div className="pokemon-detail-page__loading">Loading...</div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="pokemon-detail-page">
        <div className="pokemon-detail-page__error">Error: {error?.message || 'Pokemon not found'}</div>
      </div>
    );
  }

  const primaryColor = getPrimaryTypeColor(pokemon.types);

  return (
    <div className="pokemon-detail-page">
      <PokemonHeader
        pokemon={pokemon}
        onPrevious={pokemon.id > 1 ? handlePrevious : undefined}
        onNext={pokemon.id < 151 ? handleNext : undefined}
      />
      <div className="pokemon-detail-page__content">
        <div className="pokemon-detail-page__types">
          {pokemon.types.map((type) => (
            <TypeBadge key={type.slot} typeName={type.type.name} />
          ))}
        </div>
        <AboutSection pokemon={pokemon} description={description} primaryColor={primaryColor} />
        <BaseStatsSection pokemon={pokemon} primaryColor={primaryColor} />
      </div>
    </div>
  );
};

