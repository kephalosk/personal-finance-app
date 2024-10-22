import './PaginationPages.scss';

export function PaginationPages() {
  return (
    <>
      <div className="paginationPages" data-testid="pagination-pages">
        <button className="paginationPagesButton">1</button>
        <button className="paginationPagesButton">2</button>
        <button className="paginationPagesButton">3</button>
        <button className="paginationPagesButton">4</button>
        <button className="paginationPagesButton">5</button>
      </div>
    </>
  );
}
