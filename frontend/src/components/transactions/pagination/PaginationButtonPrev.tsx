import './PaginationButtonPrev.scss';
import PropTypes from 'prop-types';
import { PaginationButtonPrevProps } from '../../../model/props/PaginationButtonPrevProps';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';

PaginationButtonPrev.propTypes = {
  onClick: PropTypes.func.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export function PaginationButtonPrev({ onClick, currentIndex }: PaginationButtonPrevProps) {
  const isSmallScreen = useIsSmallScreen();
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
          src="/images/icon-caret-left.svg"
        />
        {!isSmallScreen && 'Prev'}
      </button>
    </>
  );
}
