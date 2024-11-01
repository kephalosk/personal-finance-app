export interface PaginationPagesProps {
  onPageClick: (newIndex: number) => void;
  indexMax: number;
  currentIndex: number;
}
