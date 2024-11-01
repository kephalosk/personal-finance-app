import './BillCard.scss';
import { EPTransaction } from '../../types/EPTransaction';
import { BillCardTableRow } from './BillCardTableRow';
import { BillCardProps } from '../../types/BillCardProps';
import { SearchbarInput } from '../searchbar/SearchbarInput';
import { useRef, useState } from 'react';
import { SearchbarInputHandle } from '../../types/SearchbarInputHandle';
import { SearchbarDropdownSort } from '../searchbar/SearchbarDropdownSort';
import { SortOptionEnum } from '../../constants/SortOptionEnum';
import { getTransactions } from '../../globals/services/TransactionService';
import PropTypes from 'prop-types';

BillCard.propTypes = {
  bills: PropTypes.array.isRequired,
  today: PropTypes.object.isRequired,
};

export function BillCard({ bills, today }: BillCardProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [currentSortOption, setCurrentSortOption] = useState<string>(SortOptionEnum.LATEST);
  const searchbarRef = useRef<SearchbarInputHandle>();

  const handleInputChange = (currentInput: string) => {
    //TODO
    // const filteredByInput = transactions.filter((transaction) => {
    //     const transactionSmall = transaction.name.toLowerCase();
    //     const inputSmall = currentInput.toLowerCase();
    //     return transactionSmall.includes(inputSmall);
    // });
    //
    // shadowFilteredTransactions = [...filteredByInput];
    //
    // handleCategoryChange(currentCategory, filteredByInput);
  };

  const handleSortChange = (sortOption: string) => {
    let sorted = [...getTransactions()];

    setCurrentSortOption(sortOption);

    switch (sortOption) {
      case SortOptionEnum.LATEST:
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case SortOptionEnum.OLDEST:
        sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case SortOptionEnum.ATOZ:
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case SortOptionEnum.ZTOA:
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case SortOptionEnum.HIGHEST:
        sorted.sort((a, b) => b.amount - a.amount);
        break;
      case SortOptionEnum.LOWEST:
        sorted.sort((a, b) => a.amount - b.amount);
        break;
      default:
        sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }

    // setFilteredTransactions(sorted);

    setPageIndex(0);
  };

  return (
    <>
      <div className="billCard" data-testid="bill-card">
        <div className="billCardSearchbar">
          <SearchbarInput ref={searchbarRef} onInputChange={handleInputChange} />
          <label className="searchbarLabel sortBy">Sort by</label>
          <SearchbarDropdownSort onSortChange={handleSortChange} />
        </div>
        <div className="billCardTable">
          <div className="billCardTableHeader">
            <label className="billCardTableHeaderName">Bill Title</label>
            <label className="billCardTableHeaderDate">Due Date</label>
            <label className="billCardTableHeaderAmount">Amount</label>
          </div>
          {bills.map((transaction: EPTransaction, index: number) => (
            <BillCardTableRow key={index} transaction={transaction} today={today} />
          ))}
        </div>
      </div>
    </>
  );
}
