import './BillCard.scss';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';
import BillCardTableRow from './BillCardTableRow';
import SearchbarInput from '../searchbar/SearchbarInput';
import { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { SearchbarInputHandle } from '../../model/SearchbarInputHandle';
import SearchbarDropdownSort from '../searchbar/SearchbarDropdownSort';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import useIsSmallScreen from '../../globals/hooks/useIsSmallScreen';
import BillCardTableRowSmall from './BillCardTableRowSmall';
import LoadingSpinner from '../LoadingSpinner';
import isDefined from '../../globals/helper/isDefined';

interface Props {
  bills: EPTransaction[];
  today: Date;
  isLoading: boolean;
}

const BillCard: ({ bills, today, isLoading }: Props) => ReactNode = ({
  bills,
  today,
  isLoading,
}: Props): ReactNode => {
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOptionEnum.LATEST);

  const billsInitLatest: EPTransaction[] = bills.sort(
    (a: EPTransaction, b: EPTransaction) => b.dateRaw.getDate() - a.dateRaw.getDate()
  );
  const [filteredTransactions, setFilteredTransactions] = useState(billsInitLatest);

  let shadowFilteredTransactions: EPTransaction[] = [...filteredTransactions];

  const searchbarRef: MutableRefObject<SearchbarInputHandle | null> =
    useRef<SearchbarInputHandle | null>(null);

  const isSmallScreen: boolean = useIsSmallScreen();

  useEffect((): void => {
    const sortedBills: EPTransaction[] = [...bills].sort(
      (a: EPTransaction, b: EPTransaction) => b.dateRaw.getDate() - a.dateRaw.getDate()
    );
    setFilteredTransactions(sortedBills);
  }, [bills]);

  const handleSortChange: (sortOption: string) => void = (sortOption: string): void => {
    let sorted: EPTransaction[] = [...shadowFilteredTransactions];

    setCurrentSortOption(sortOption);

    switch (sortOption) {
      case SortOptionEnum.LATEST:
        sorted.sort(
          (a: EPTransaction, b: EPTransaction) => b.dateRaw.getDate() - a.dateRaw.getDate()
        );
        break;
      case SortOptionEnum.OLDEST:
        sorted.sort(
          (a: EPTransaction, b: EPTransaction) => a.dateRaw.getDate() - b.dateRaw.getDate()
        );
        break;
      case SortOptionEnum.ATOZ:
        sorted.sort((a: EPTransaction, b: EPTransaction) => a.name.localeCompare(b.name));
        break;
      case SortOptionEnum.ZTOA:
        sorted.sort((a: EPTransaction, b: EPTransaction) => b.name.localeCompare(a.name));
        break;
      case SortOptionEnum.LOWEST:
        sorted.sort((a: EPTransaction, b: EPTransaction) => b.amount - a.amount);
        break;
      case SortOptionEnum.HIGHEST:
        sorted.sort((a: EPTransaction, b: EPTransaction) => a.amount - b.amount);
        break;
    }

    setFilteredTransactions(sorted);
  };

  const handleInputChange: (currentInput: string) => void = (currentInput: string): void => {
    const filteredByInput: EPTransaction[] = bills.filter((transaction) => {
      const transactionSmall: string = transaction.name.toLowerCase();
      const inputSmall: string = currentInput.toLowerCase();
      return transactionSmall.includes(inputSmall);
    });

    shadowFilteredTransactions = [...filteredByInput];

    if (filteredByInput.length === bills.length && isDefined(searchbarRef.current)) {
      searchbarRef.current?.clearInput();
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
            <div className="billCardSearchbarInput">
              <SearchbarInput ref={searchbarRef} onInputChange={handleInputChange} />
            </div>
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
};

export default BillCard;
