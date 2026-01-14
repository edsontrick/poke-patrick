import { type SortOption } from '../../types/pokemon';
import './SortModal.css';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export const SortModal = ({
  isOpen,
  onClose,
  selectedSort,
  onSortChange,
}: SortModalProps) => {
  if (!isOpen) return null;

  const handleSortChange = (sort: SortOption) => {
    onSortChange(sort);
    onClose();
  };

  return (
    <>
      <div className="sort-modal__overlay" onClick={onClose} />
      <div className="sort-modal">
        <div className="sort-modal__header">
          <span>Sort by:</span>
        </div>
        <div className="sort-modal__body">
          <label className="sort-modal__option">
            <input
              type="radio"
              name="sort"
              value="number"
              checked={selectedSort === 'number'}
              onChange={() => handleSortChange('number')}
            />
            <span>Number</span>
          </label>
          <label className="sort-modal__option">
            <input
              type="radio"
              name="sort"
              value="name"
              checked={selectedSort === 'name'}
              onChange={() => handleSortChange('name')}
            />
            <span>Name</span>
          </label>
        </div>
      </div>
    </>
  );
};

