import './SearchBar.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ value, onChange, placeholder = 'Search' }: SearchBarProps) => {
  return (
    <div className="search-bar">
      <svg
        className="search-bar__icon"
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.3333 10.3333H10.6867L10.46 10.1133C11.3467 9.06 11.84 7.75333 11.84 6.33333C11.84 2.94667 9.22667 0.333333 5.84 0.333333C2.45333 0.333333 -0.16 2.94667 -0.16 6.33333C-0.16 9.72 2.45333 12.3333 5.84 12.3333C7.26 12.3333 8.56667 11.84 9.62 10.9533L9.84 11.18V11.8267L14.3333 16.3067L15.9067 14.7333L11.3333 10.3333ZM5.84 10.3333C3.51333 10.3333 1.62667 8.44667 1.62667 6.12C1.62667 3.79333 3.51333 1.90667 5.84 1.90667C8.16667 1.90667 10.0533 3.79333 10.0533 6.12C10.0533 8.44667 8.16667 10.3333 5.84 10.3333Z"
          fill="#666"
        />
      </svg>
      <input
        className="search-bar__input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
};

