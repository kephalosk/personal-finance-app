import './TableHeader.scss';
import React from 'react';

const TableHeader: () => React.ReactNode = (): React.ReactNode => {
  return (
    <>
      <div className="transactionsTableHeader" data-testid="table-header">
        <label className="tableColumnName">Recipient / Sender</label>
        <label className="tableColumnCategory">Category</label>
        <label className="tableColumnDate">Transaction Date</label>
        <label className="tableColumnAmount">Amount</label>
      </div>
    </>
  );
};

export default TableHeader;
