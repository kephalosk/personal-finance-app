import './BillCard.scss';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import { BillCardTableRow } from './BillCardTableRow';
import { BillCardProps } from '../../model/props/BillCardProps';
import SearchbarInput from '../searchbar/SearchbarInput';
import { useEffect, useRef, useState } from 'react';
import { SearchbarInputHandle } from '../../model/SearchbarInputHandle';
import SearchbarDropdownSort from '../searchbar/SearchbarDropdownSort';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import PropTypes from 'prop-types';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import { BillCardTableRowSmall } from './BillCardTableRowSmall';
import LoadingSpinner from '../LoadingSpinner';

BillCard.propTypes = {
  bills: PropTypes.array.isRequired,
  today: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function BillCard({ bills, today, isLoading }: BillCardProps) {
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOptionEnum.LATEST);

  const billsInitLatest: EPTransaction[] = bills.sort(
    (a, b) => b.dateRaw.getDate() - a.dateRaw.getDate()
  );
  const [filteredTransactions, setFilteredTransactions] = useState(billsInitLatest);

  let shadowFilteredTransactions: EPTransaction[] = [...filteredTransactions];

  const searchbarRef = useRef<SearchbarInputHandle | null>(null);

  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    const sortedBills = [...bills].sort((a, b) => b.dateRaw.getDate() - a.dateRaw.getDate());
    setFilteredTransactions(sortedBills);
  }, [bills]);

  const handleSortChange = (sortOption: string) => {
    let sorted = [...shadowFilteredTransactions];

    setCurrentSortOption(sortOption);

    switch (sortOption) {
      case SortOptionEnum.LATEST:
        sorted.sort((a, b) => b.dateRaw.getDate() - a.dateRaw.getDate());
        break;
      case SortOptionEnum.OLDEST:
        sorted.sort((a, b) => a.dateRaw.getDate() - b.dateRaw.getDate());
        break;
      case SortOptionEnum.ATOZ:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOptionEnum.ZTOA:
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SortOptionEnum.LOWEST:
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case SortOptionEnum.HIGHEST:
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        sorted.sort((a, b) => b.dateRaw.getTime() - a.dateRaw.getTime());
        break;
    }

    setFilteredTransactions(sorted);
  };

  const handleInputChange = (currentInput: string) => {
    const filteredByInput = bills.filter((transaction) => {
      const transactionSmall = transaction.name.toLowerCase();
      const inputSmall = currentInput.toLowerCase();
      return transactionSmall.includes(inputSmall);
    });

    shadowFilteredTransactions = [...filteredByInput];

    if (filteredByInput.length === bills.length && searchbarRef.current) {
      searchbarRef.current.clearInput();
    }

    handleSortChange(currentSortOption);
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="billCard" data-testid="bill-card">
          <div className="billCardSearchbar">
            <SearchbarInput ref={searchbarRef} onInputChange={handleInputChange} />
            {!isSmallScreen && <label className="searchbarLabel sortBy">Sort by</label>}
            <SearchbarDropdownSort onSortChange={handleSortChange} />
          </div>
          <div className="billCardTable">
            {!isSmallScreen && (
              <div className="billCardTableHeader">
                <label className="billCardTableHeaderName">Bill Title</label>
                <label className="billCardTableHeaderDate">Due Date</label>
                <label className="billCardTableHeaderAmount">Amount</label>
              </div>
            )}
            {!isSmallScreen &&
              filteredTransactions.map((transaction: EPTransaction, index: number) => (
                <BillCardTableRow key={index} transaction={transaction} today={today} />
              ))}
            {isSmallScreen &&
              filteredTransactions.map((transaction: EPTransaction, index: number) => (
                <div key={index}>
                  <BillCardTableRowSmall transaction={transaction} today={today} />
                  {index < filteredTransactions.length - 1 && <hr />}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
