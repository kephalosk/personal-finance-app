import './PaginationButtonPrev.scss';

export function PaginationButtonPrev() {
  return (
    <>
      <button className="paginationButtonPrev" data-testid="pagination-button-prev">
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
