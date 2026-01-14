import type { Pokemon } from '../../types/pokemon';
import { formatWeight, formatHeight, formatPokemonName } from '../../utils/formatting';
import './AboutSection.css';

interface AboutSectionProps {
  pokemon: Pokemon;
  description: string;
  primaryColor: string;
}

export const AboutSection = ({ pokemon, description, primaryColor }: AboutSectionProps) => {
  const abilities = pokemon.abilities.map((ability) => ability.ability.name);

  return (
    <div className="about-section">
      <h2 className="about-section__title" style={{ color: primaryColor }}>
        About
      </h2>
      <div className="about-section__details">
        <div className="about-section__detail">
          <div className="about-section__detail-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3 4C3 2.89543 3.89543 2 5 2H11C12.1046 2 13 2.89543 13 4V12C13 13.1046 12.1046 14 11 14H5C3.89543 14 3 13.1046 3 12V4Z"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 4L5 2M11 4L11 2"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="about-section__detail-value">{formatWeight(pokemon.weight)}</div>
          <div className="about-section__detail-label">Weight</div>
        </div>
        <div className="about-section__divider" />
        <div className="about-section__detail">
          <div className="about-section__detail-icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 1V15M1 8H15"
                stroke="#666"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="about-section__detail-value">{formatHeight(pokemon.height)}</div>
          <div className="about-section__detail-label">Height</div>
        </div>
        <div className="about-section__divider" />
        <div className="about-section__detail">
          <div className="about-section__detail-value">
            {abilities.map((ability, index) => (
              <span key={ability}>
                {formatPokemonName(ability)}
                {index < abilities.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
          <div className="about-section__detail-label">Moves</div>
        </div>
      </div>
      <p className="about-section__description">{description}</p>
    </div>
  );
};

