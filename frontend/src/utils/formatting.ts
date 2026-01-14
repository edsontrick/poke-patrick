export const formatPokemonName = (name: string): string => {
  return name.charAt(0).toUpperCase() + name.slice(1);
};

export const formatPokemonNumber = (id: number): string => {
  return `#${String(id).padStart(3, '0')}`;
};

export const formatWeight = (weight: number): string => {
  return `${(weight / 10).toFixed(1).replace('.', ',')} kg`;
};

export const formatHeight = (height: number): string => {
  return `${(height / 10).toFixed(1).replace('.', ',')} m`;
};

export const formatStatName = (statName: string): string => {
  const statMap: Record<string, string> = {
    hp: 'HP',
    attack: 'ATK',
    defense: 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    speed: 'SPD',
  };
  return statMap[statName] || statName.toUpperCase();
};

