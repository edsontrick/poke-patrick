import './StatBar.css';

interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
  color: string;
}

export const StatBar = ({ label, value, maxValue = 255, color }: StatBarProps) => {
  const percentage = (value / maxValue) * 100;

  return (
    <div className="stat-bar">
      <div className="stat-bar__header">
        <span className="stat-bar__label">{label}</span>
        <span className="stat-bar__value">{String(value).padStart(3, '0')}</span>
      </div>
      <div className="stat-bar__track">
        <div
          className="stat-bar__fill"
          style={{
            width: `${percentage}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
};

