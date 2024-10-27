import './PaginationButtonPrev.scss';
import PropTypes from 'prop-types';
import { PaginationButtonPrevProps } from '../../../types/PaginationButtonPrevProps';

PaginationButtonPrev.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export function PaginationButtonPrev({ onClick, currentIndex }: PaginationButtonPrevProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`paginationButtonPrev ${currentIndex > 0 ? 'isEnabled' : 'isDisabled'}`}
        data-testid="pagination-button-prev"
      >
        <img
          className="paginationButtonPrevCaret"
          alt="icon of caret left"
          aria-hidden="true"
          src="./src/assets/images/icon-caret-left.svg"
        />
        Prev
      </button>
    </>
  );
}
