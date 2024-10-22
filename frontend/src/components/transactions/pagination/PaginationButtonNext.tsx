import './PaginationButtonNext.scss';

export function PaginationButtonNext() {
  return (
    <>
      <button className="paginationButtonNext">
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
