import './TransactionsPage.scss';
import { PaginationButtonNext } from '../components/transactions/pagination/PaginationButtonNext';
import { PaginationButtonPrev } from '../components/transactions/pagination/PaginationButtonPrev';
import { PaginationPages } from '../components/transactions/pagination/PaginationPages';
import { SearchbarInput } from '../components/transactions/searchbar/SearchbarInput';
import { SearchbarDropdownSort } from '../components/transactions/searchbar/SearchbarDropdownSort';
import { SearchbarDropdownCategory } from '../components/transactions/searchbar/SearchbarDropdownCategory';
import { TableHeader } from '../components/transactions/table/TableHeader';
import { TableRow } from '../components/transactions/table/TableRow';
import { TransactionsPageEntries } from '../constants/TransactionsPageEntries';
import { TransactionsPageTableRowProps } from '../types/TransactionsPageTableRowProps';

export function TransactionsPage() {
  return (
    <>
      <div className="transactionsPage" data-testid="transactions-page">
        <h1>Transactions</h1>
        <div className="transactionsDetails">
          <div className="transactionsSearchbar">
            <SearchbarInput />
            <label className="searchbarLabelSort">Sort by</label>
            <SearchbarDropdownSort />
            <label className="searchbarLabelCategory">Category</label>
            <SearchbarDropdownCategory />
          </div>
          <div className="transactionsTable">
            <TableHeader />
            {TransactionsPageEntries.map((entry: TransactionsPageTableRowProps) => (
              <TableRow
                key={entry.name}
                name={entry.name}
                imgSrc={entry.imgSrc}
                category={entry.category}
                date={entry.date}
                value={entry.value}
              />
            ))}
          </div>
          <div className="transactionsPagination">
            <PaginationButtonPrev />
            <PaginationPages />
            <PaginationButtonNext />
          </div>
        </div>
      </div>
    </>
  );
}
