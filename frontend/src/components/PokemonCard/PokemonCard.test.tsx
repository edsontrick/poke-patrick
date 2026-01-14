import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PokemonCard } from './PokemonCard';

describe('PokemonCard', () => {
  it('should render pokemon name', () => {
    render(
      <BrowserRouter>
        <PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />
      </BrowserRouter>
    );

    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
  });

  it('should render pokemon number', () => {
    render(
      <BrowserRouter>
        <PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />
      </BrowserRouter>
    );

    expect(screen.getByText(/#001/i)).toBeInTheDocument();
  });

  it('should have correct link to pokemon detail page', () => {
    render(
      <BrowserRouter>
        <PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/pokemon/1');
  });

  it('should render pokemon image with correct alt text', () => {
    render(
      <BrowserRouter>
        <PokemonCard name="bulbasaur" url="https://pokeapi.co/api/v2/pokemon/1/" />
      </BrowserRouter>
    );

    const image = screen.getByAltText('bulbasaur');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', expect.stringContaining('1.png'));
  });
});

