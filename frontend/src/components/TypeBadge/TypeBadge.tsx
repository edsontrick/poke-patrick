import { getTypeColor } from '../../utils/colors';
import { formatPokemonName } from '../../utils/formatting';
import './TypeBadge.css';

interface TypeBadgeProps {
  typeName: string;
}

export const TypeBadge = ({ typeName }: TypeBadgeProps) => {
  const color = getTypeColor(typeName);
  const formattedName = formatPokemonName(typeName);

  return (
    <span className="type-badge" style={{ backgroundColor: color }}>
      {formattedName}
    </span>
  );
};

