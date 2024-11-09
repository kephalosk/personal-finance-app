import './PaginationButtonNext.scss';
import PropTypes from 'prop-types';
import { PaginationButtonNextProps } from '../../../model/props/PaginationButtonNextProps';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';

PaginationButtonNext.propTypes = {
  onClick: PropTypes.func.isRequired,
  isMaxIndex: PropTypes.bool.isRequired,
};

export function PaginationButtonNext({ onClick, isMaxIndex }: PaginationButtonNextProps) {
  const isSmallScreen = useIsSmallScreen();
  return (
    <>
      <button
        onClick={onClick}
        className={`paginationButtonNext ${isMaxIndex ? 'isDisabled' : 'isEnabled'}`}
        data-testid="pagination-button-next"
      >
        {!isSmallScreen && 'Next'}
        <img
          className="paginationButtonNextCaret"
          alt="icon of caret right"
          aria-hidden="true"
          src="/images/icon-caret-right.svg"
        />
      </button>
    </>
  );
}
