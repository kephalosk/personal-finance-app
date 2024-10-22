import './PaginationButtonNext.scss';

export function PaginationButtonNext() {
  return (
    <>
      <button className="paginationButtonNext" data-testid="pagination-button-next">
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
