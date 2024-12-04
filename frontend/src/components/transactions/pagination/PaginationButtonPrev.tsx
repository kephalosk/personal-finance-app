import './PaginationButtonPrev.scss';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  currentIndex: number;
}

const PaginationButtonPrev: ({ onClick, currentIndex }: Props) => ReactNode = ({
  onClick,
  currentIndex,
}: Props): ReactNode => {
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
          aria-hidden="false"
          src="/images/icon-caret-left.svg"
        />
        {!isSmallScreen && 'Prev'}
      </button>
    </>
  );
};

export default PaginationButtonPrev;
