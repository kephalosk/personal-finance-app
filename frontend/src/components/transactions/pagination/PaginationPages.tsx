import './PaginationPages.scss';
import PropTypes from 'prop-types';
import { PaginationPagesProps } from '../../../types/PaginationPagesProps';

PaginationPages.propTypes = {
  indexMax: PropTypes.number.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export function PaginationPages({ indexMax, currentIndex }: PaginationPagesProps) {
  return (
    <>
      <div className="paginationPages" data-testid="pagination-pages">
        {Array.from({ length: indexMax }, (_, index) => (
          <button
            key={index}
            className={`paginationPagesButton ${index === currentIndex ? 'isActive' : 'isNotActive'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}
