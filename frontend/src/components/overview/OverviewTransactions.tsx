import './OverviewTransactions.scss';
import { OverviewHeader } from './OverviewHeader';
import { TransactionRow } from './TransactionRow';

export function OverviewTransactions() {
  return (
    <>
      <div className="overviewTransactions">
        <OverviewHeader title="Transactions" linkText="View All" linkTarget="//" />
        <TransactionRow
          name="Emma Richardsen"
          value="+$75.50"
          date="19 Aug 2024"
          imgSrc="./src/assets/images/avatars/emma-richardson.jpg"
        />
        <TransactionRow
          name="Savory Bites Bistro"
          value="-$55.50"
          date="19 Aug 2024"
          imgSrc="./src/assets/images/avatars/savory-bites-bistro.jpg"
        />
        <TransactionRow
          name="Daniel Carter"
          value="-$42.30"
          date="18 Aug 2024"
          imgSrc="./src/assets/images/avatars/daniel-carter.jpg"
        />
        <TransactionRow
          name="Sun Park"
          value="+$120.00"
          date="17 Aug 2024"
          imgSrc="./src/assets/images/avatars/sun-park.jpg"
        />
        <TransactionRow
          name="Urban Services Hub"
          value="-$65.00"
          date="17 Aug 2024"
          imgSrc="./src/assets/images/avatars/urban-services-hub.jpg"
        />
      </div>
    </>
  );
}
