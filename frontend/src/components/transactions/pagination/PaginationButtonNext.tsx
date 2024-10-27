import './PaginationButtonNext.scss';
import PropTypes from 'prop-types';
import { PaginationButtonNextProps } from '../../../types/PaginationButtonNextProps';

PaginationButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMaxIndex: PropTypes.bool.isRequired,
};

export function PaginationButtonNext({ onClick, isMaxIndex }: PaginationButtonNextProps) {
  return (
    <>
      <button
        onClick={onClick}
        className={`paginationButtonNext ${isMaxIndex ? 'isDisabled' : 'isEnabled'}`}
        data-testid="pagination-button-next"
      >
        Next
        <img
          className="paginationButtonNextCaret"
          alt="icon of caret right"
          aria-hidden="true"
          src="./src/assets/images/icon-caret-right.svg"
        />
      </button>
    </>
  );
}
