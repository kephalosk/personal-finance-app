import './PaginationButtonPrev.scss';
import PropTypes from 'prop-types';
import { PaginationButtonPrevProps } from '../../../types/PaginationButtonPrevProps';

PaginationButtonPrev.propTypes = {
  currentIndex: PropTypes.number.isRequired,
};

export function PaginationButtonPrev({ currentIndex }: PaginationButtonPrevProps) {
  return (
    <>
      <button
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
