import './OverviewTransactions.scss';
import { OverviewHeader } from '../OverviewHeader';
import { TransactionRow } from './TransactionRow';

export function OverviewTransactions() {
  return (
    <>
      <div className="overviewTransactions" data-testid="overview-transactions">
        <OverviewHeader title="Transactions" linkText="View All" linkTarget="/transactions" />
        <div className="overviewTransactionsContent">
          <TransactionRow
            name="Emma Richardsen"
            value={75.5}
            date="19 Aug 2024"
            imgSrc="./src/assets/images/avatars/emma-richardson.jpg"
          />
          <hr />
          <TransactionRow
            name="Savory Bites Bistro"
            value={-55.5}
            date="19 Aug 2024"
            imgSrc="./src/assets/images/avatars/savory-bites-bistro.jpg"
          />
          <hr />
          <TransactionRow
            name="Daniel Carter"
            value={-42.3}
            date="18 Aug 2024"
            imgSrc="./src/assets/images/avatars/daniel-carter.jpg"
          />
          <hr />
          <TransactionRow
            name="Sun Park"
            value={120.0}
            date="17 Aug 2024"
            imgSrc="./src/assets/images/avatars/sun-park.jpg"
          />
          <hr />
          <TransactionRow
            name="Urban Services Hub"
            value={-65.0}
            date="17 Aug 2024"
            imgSrc="./src/assets/images/avatars/urban-services-hub.jpg"
          />
        </div>
      </div>
    </>
  );
}
