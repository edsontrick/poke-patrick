import { useState, useEffect, useMemo } from 'react';
import { fetchPokemonList, getPokemonIdFromUrl } from '../services/api';
import type { PokemonListItem, SortOption } from '../types/pokemon';

export const usePokemonList = (sortBy: SortOption = 'number') => {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPokemonList = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPokemonList(151, 0);
        setPokemonList(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load Pokemon list'));
      } finally {
        setLoading(false);
      }
    };

    loadPokemonList();
  }, []);

  const sortedList = useMemo(() => {
    return [...pokemonList].sort((a, b) => {
      if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      const idA = getPokemonIdFromUrl(a.url);
      const idB = getPokemonIdFromUrl(b.url);
      return idA - idB;
    });
  }, [pokemonList, sortBy]);

  return { pokemonList: sortedList, loading, error };
};

