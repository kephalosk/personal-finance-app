import './PaginationButtonNext.scss';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { ReactNode } from 'react';

interface Props {
  onClick: () => void;
  isMaxIndex: boolean;
}

const PaginationButtonNext: ({ onClick, isMaxIndex }: Props) => ReactNode = ({
  onClick,
  isMaxIndex,
}: Props): ReactNode => {
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
          aria-hidden="false"
          src="/images/icon-caret-right.svg"
        />
      </button>
    </>
  );
};

export default PaginationButtonNext;
