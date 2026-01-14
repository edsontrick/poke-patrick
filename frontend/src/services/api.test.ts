import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as api from './api';

describe('API Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('fetchPokemonList', () => {
    it('should fetch pokemon list successfully', async () => {
      const mockData = {
        results: [
          { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
          { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
        ],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockData,
      } as Response);

      const result = await api.fetchPokemonList(151, 0);

      expect(result).toEqual(mockData.results);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon?limit=151&offset=0')
      );
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      } as Response);

      await expect(api.fetchPokemonList(151, 0)).rejects.toThrow(
        'Failed to fetch Pokemon list'
      );
    });
  });

  describe('fetchPokemon', () => {
    it('should fetch pokemon successfully', async () => {
      const mockPokemon = {
        id: 1,
        name: 'bulbasaur',
        height: 7,
        weight: 69,
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockPokemon,
      } as Response);

      const result = await api.fetchPokemon(1);

      expect(result).toEqual(mockPokemon);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon/1')
      );
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      } as Response);

      await expect(api.fetchPokemon(999)).rejects.toThrow(
        'Failed to fetch Pokemon: 999'
      );
    });
  });

  describe('fetchPokemonSpecies', () => {
    it('should fetch pokemon species successfully', async () => {
      const mockSpecies = {
        id: 1,
        name: 'bulbasaur',
        flavor_text_entries: [],
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSpecies,
      } as Response);

      const result = await api.fetchPokemonSpecies(1);

      expect(result).toEqual(mockSpecies);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/pokemon-species/1')
      );
    });

    it('should throw error when fetch fails', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
      } as Response);

      await expect(api.fetchPokemonSpecies(999)).rejects.toThrow(
        'Failed to fetch Pokemon species: 999'
      );
    });
  });

  describe('getPokemonIdFromUrl', () => {
    it('should extract pokemon id from url', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/1/';
      expect(api.getPokemonIdFromUrl(url)).toBe(1);
    });

    it('should return 0 for invalid url', () => {
      const url = 'invalid-url';
      expect(api.getPokemonIdFromUrl(url)).toBe(0);
    });

    it('should handle multi-digit ids', () => {
      const url = 'https://pokeapi.co/api/v2/pokemon/151/';
      expect(api.getPokemonIdFromUrl(url)).toBe(151);
    });
  });
});

