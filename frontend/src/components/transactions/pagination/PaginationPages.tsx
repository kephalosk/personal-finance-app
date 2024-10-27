import './PaginationPages.scss';
import PropTypes from 'prop-types';
import { PaginationPagesProps } from '../../../types/PaginationPagesProps';

PaginationPages.propTypes = {
  onPageClick: PropTypes.func.isRequired,
  indexMax: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export function PaginationPages({ onPageClick, indexMax, currentIndex }: PaginationPagesProps) {
  return (
    <>
      <div className="paginationPages" data-testid="pagination-pages">
        {Array.from({ length: indexMax }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageClick(index)}
            className={`paginationPagesButton ${index === currentIndex ? 'isActive' : 'isNotActive'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
