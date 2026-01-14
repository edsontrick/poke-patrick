import { useState, useEffect } from 'react';
import { fetchPokemon, fetchPokemonSpecies } from '../services/api';
import type { Pokemon, PokemonSpecies } from '../types/pokemon';

export const usePokemon = (idOrName: string | number) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPokemon = async () => {
      try {
        setLoading(true);
        setError(null);
        const [pokemonData, speciesData] = await Promise.all([
          fetchPokemon(idOrName),
          fetchPokemonSpecies(idOrName),
        ]);
        setPokemon(pokemonData);
        setSpecies(speciesData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load Pokemon'));
      } finally {
        setLoading(false);
      }
    };

    loadPokemon();
  }, [idOrName]);

  const description = species?.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )?.flavor_text.replace(/\f/g, ' ') || '';

  return { pokemon, species, description, loading, error };
};

