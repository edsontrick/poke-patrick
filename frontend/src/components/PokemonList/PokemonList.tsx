import { PokemonCard } from '../PokemonCard/PokemonCard';
import type { PokemonListItem } from '../../types/pokemon';
import './PokemonList.css';

interface PokemonListProps {
  pokemonList: PokemonListItem[];
  searchQuery: string;
}

export const PokemonList = ({ pokemonList, searchQuery }: PokemonListProps) => {
  const filteredList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredList.length === 0) {
    return (
      <div className="pokemon-list__empty">
        <p>No Pokémon found</p>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {filteredList.map((pokemon) => (
        <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url} />
      ))}
    </div>
  );
};

