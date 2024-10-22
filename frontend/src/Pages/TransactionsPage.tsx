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
import { EPTransaction } from '../types/EPTransaction';
import { getTransactions } from '../globals/services/TransactionService';
import { splitIntoChunks } from '../globals/utils/SplitIntoChunks';

export function TransactionsPage() {
  const transactions: EPTransaction[] = getTransactions();
  const pageEntrySize: number = 10;
  const transactionsPaged: EPTransaction[][] = splitIntoChunks(transactions, pageEntrySize);
  const pageIndex = 0;

  const currentTransactions = transactionsPaged.at(pageIndex) ?? [];

  return (
    <>
      <div className="transactionsPage" data-testid="transactions-page">
        <h1>Transactions</h1>
        <div className="transactionsDetails">
          <div className="transactionsSearchbar">
            <SearchbarInput />
            <label className="searchbarLabel">Sort by</label>
            <SearchbarDropdownSort />
            <label className="searchbarLabel">Category</label>
            <SearchbarDropdownCategory />
          </div>
          <div className="transactionsTable">
            <TableHeader />
            {currentTransactions.map((entry: EPTransaction) => (
              <TableRow
                key={entry.name}
                name={entry.name}
                imgSrc={entry.avatar}
                category={entry.category}
                date={entry.date}
                value={entry.amount}
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
