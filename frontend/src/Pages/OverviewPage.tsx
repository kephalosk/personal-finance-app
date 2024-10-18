import './OverviewPage.scss';
import { ValueBox } from '../Components/ValueBox';
import { SummaryCard } from '../Components/SummaryCard';
import { OverviewHeader } from '../Components/OverviewHeader';
import { TransactionRow } from '../Components/TransactionRow';
import { BillRow } from '../Components/BillRow';

export function OverviewPage() {
  return (
    <div className="overviewPage">
      <h1>Overview</h1>
      <div className="overviewSummary">
        <SummaryCard title="Current Balance" value="4,836.00" />
        <SummaryCard title="Income" value="3,814.25" />
        <SummaryCard title="Expenses" value="1,700.50" />
      </div>
      <div className="overviewDetails">
        <div className="overviewDetailsLeft">
          <div className="overviewPots">
            <OverviewHeader title="Pots" linkText="See Details" linkTarget="//" />
            <div className="overviewPotsContent">
              <div className="overviewPotsSummary">
                <img className="overviewPotsSummaryIcon" alt="money icon" aria-hidden="true" />
                <div className="overviewPotsSummaryContent">
                  <label className="overviewPotsSummaryContentTitle">Total Saved</label>
                  <label className="overviewPotsSummaryContentValue">$850</label>
                </div>
              </div>
              <div className="overviewPotsValuesLeft">
                <ValueBox title="Savings" value="159" color="dark-green" />
                <ValueBox title="Concert Ticket" value="110" color="dark-grey" />
              </div>
              <div className="overviewPotsValuesRight">
                <ValueBox title="Gift" value="40" color="light-blue" />
                <ValueBox title="New Laptop" value="10" color="beige" />
              </div>
            </div>
          </div>
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
        </div>
        <div className="overviewDetailsRight">
          <div className="overviewBudgets">
            <OverviewHeader title="Budgets" linkText="See Details" linkTarget="//" />
            <div className="overviewBudgetsContent">
              <div className="overviewBudgetsDiagramm">
                <label className="overviewBudgetsDiagrammSpend">$338</label>
                <label className="overviewBudgetsDiagrammTotal">of $975 limit</label>
              </div>
              <div className="overviewBudgetsValues">
                <ValueBox title="Entertainment" value="50.00" color="dark-green" />
                <ValueBox title="Bills" value="750.00" color="light-blue" />
                <ValueBox title="Dining Out" value="75.00" color="beige" />
                <ValueBox title="Personal Care" value="100.00" color="dark-grey" />
              </div>
            </div>
          </div>
          <div className="overviewBills">
            <OverviewHeader title="Recurring Bills" linkText="See Details" linkTarget="//" />
            <BillRow title="Paid Bills" value="$190.00<" />
            <BillRow title="Total Upcoming" value="$194.98" />
            <BillRow title="Due Soon" value="$59.98" />
          </div>
        </div>
      </div>
    </div>
  );
}
