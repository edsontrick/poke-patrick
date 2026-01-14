import type { Pokemon, PokemonSpecies, PokemonListItem } from '../types/pokemon';

const API_BASE_URL = 'https://pokeapi.co/api/v2';

export const fetchPokemonList = async (limit = 151, offset = 0): Promise<PokemonListItem[]> => {
  const response = await fetch(`${API_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon list');
  }
  const data = await response.json();
  return data.results;
};

export const fetchPokemon = async (idOrName: string | number): Promise<Pokemon> => {
  const response = await fetch(`${API_BASE_URL}/pokemon/${idOrName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon: ${idOrName}`);
  }
  return response.json();
};

export const fetchPokemonSpecies = async (idOrName: string | number): Promise<PokemonSpecies> => {
  const response = await fetch(`${API_BASE_URL}/pokemon-species/${idOrName}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch Pokemon species: ${idOrName}`);
  }
  return response.json();
};

export const getPokemonIdFromUrl = (url: string): number => {
  const matches = url.match(/\/pokemon\/(\d+)\//);
  return matches ? parseInt(matches[1], 10) : 0;
};

