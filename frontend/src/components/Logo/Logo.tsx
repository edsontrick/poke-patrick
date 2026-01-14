import './Logo.css';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export const Logo = ({ size = 32, showText = true }: LogoProps) => {
  return (
    <div className="logo">
      <div className="logo__icon" style={{ width: size, height: size }}>
        <img 
          src="/images/pokeball.svg" 
          alt="Poké Ball" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
      {showText && <h1 className="logo__text">Pokédex</h1>}
    </div>
  );
};

