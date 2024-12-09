import './PaginationPages.scss';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import { ReactNode } from 'react';

interface Props {
  onPageClick: (newIndex: number) => void;
  indexMax: number;
  currentIndex: number;
}

const PaginationPages: ({ onPageClick, indexMax, currentIndex }: Props) => ReactNode = ({
  onPageClick,
  indexMax,
  currentIndex,
}: Props): ReactNode => {
  const isSmallScreen = useIsSmallScreen();
  if (isSmallScreen && indexMax > 3) {
    return (
      <>
        <div className="paginationPages" data-testid="pagination-pages">
          {currentIndex === indexMax - 1 && (
            <button
              onClick={() => onPageClick(0)}
              className="paginationPagesButton isNotActive pageOne"
            >
              {1}
            </button>
          )}
          {currentIndex >= indexMax - 2 && (
            <button disabled={true} className="paginationPagesButton placeholderLeft">
              {'...'}
            </button>
          )}
          {currentIndex < indexMax - 2 && (
            <button
              onClick={() => onPageClick(currentIndex)}
              className="paginationPagesButton isActive pageBetween"
            >
              {currentIndex + 1}
            </button>
          )}
          {currentIndex < indexMax - 2 && (
            <button disabled={true} className="paginationPagesButton placeholderRight">
              {'...'}
            </button>
          )}
          {currentIndex === indexMax - 2 && (
            <button
              onClick={() => onPageClick(currentIndex)}
              className="paginationPagesButton isActive pagePenultimate"
            >
              {currentIndex + 1}
            </button>
          )}
          <button
            onClick={() => onPageClick(indexMax - 1)}
            className={`paginationPagesButton ${indexMax - 1 === currentIndex ? 'isActive' : 'isNotActive'} pageLast`}
          >
            {indexMax}
          </button>
        </div>
      </>
    );
  } else {
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
};

export default PaginationPages;
