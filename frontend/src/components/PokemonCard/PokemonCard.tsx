import { Link } from 'react-router-dom';
import { getPokemonIdFromUrl } from '../../services/api';
import { formatPokemonNumber, formatPokemonName } from '../../utils/formatting';
import './PokemonCard.css';

interface PokemonCardProps {
  name: string;
  url: string;
}

export const PokemonCard = ({ name, url }: PokemonCardProps) => {
  const id = getPokemonIdFromUrl(url);
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

  return (
    <Link to={`/pokemon/${id}`} className="pokemon-card">
      <div className="pokemon-card__number">{formatPokemonNumber(id)}</div>
      <div className="pokemon-card__image">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="pokemon-card__name">{formatPokemonName(name)}</div>
    </Link>
  );
};

