import type { Pokemon } from '../../types/pokemon';
import { formatStatName } from '../../utils/formatting';
import { StatBar } from '../StatBar/StatBar';
import './BaseStatsSection.css';

interface BaseStatsSectionProps {
  pokemon: Pokemon;
  primaryColor: string;
}

export const BaseStatsSection = ({ pokemon, primaryColor }: BaseStatsSectionProps) => {
  return (
    <div className="base-stats-section">
      <h2 className="base-stats-section__title" style={{ color: primaryColor }}>
        Base Stats
      </h2>
      <div className="base-stats-section__stats">
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            label={formatStatName(stat.stat.name)}
            value={stat.base_stat}
            color={primaryColor}
          />
        ))}
      </div>
    </div>
  );
};

