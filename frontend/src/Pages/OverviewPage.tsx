import './OverviewPage.scss';

export function OverviewPage() {
  return (
    <div className="overviewPage">
      <h1>Overview</h1>
      <div className="overviewSummary">
        <div className="overviewSummaryCard">
          <label className="overviewSummaryCardTitle">Current Balance</label>
          <label className="overviewSummaryCardValue">$4,836.00</label>
        </div>
        <div className="overviewSummaryCard">
          <label className="overviewSummaryCardTitle">Income</label>
          <label className="overviewSummaryCardValue">$3,814.25</label>
        </div>
        <div className="overviewSummaryCard">
          <label className="overviewSummaryCardTitle">Expenses</label>
          <label className="overviewSummaryCardValue">$1,700.50</label>
        </div>
      </div>
      <div className="overviewDetails">
        <div className="overviewDetailsLeft">
          <div className="overviewPots">
            <div className="overviewHeader">
              <h2 className="overviewHeaderTitle">Pots</h2>
              <a className="overviewHeaderLink" href="//">
                See Details
                <img className="overviewHeaderLink" alt="triangle icon" aria-hidden="true" />
              </a>
            </div>
            <div className="overviewPotsContent">
              <div className="overviewPotsSummary">
                <img className="overviewPotsSummaryIcon" alt="money icon" aria-hidden="true" />
                <div className="overviewPotsSummaryContent">
                  <label className="overviewPotsSummaryContentTitle">Total Saved</label>
                  <label className="overviewPotsSummaryContentValue">$850</label>
                </div>
              </div>
              <div className="overviewPotsValuesLeft">
                <div className="valueBox">
                  <label className="valueBoxTitle">Savings</label>
                  <label className="valueBoxValue">$159</label>
                </div>
                <div className="valueBox">
                  <label className="valueBoxTitle">Concert Ticket</label>
                  <label className="valueBoxValue">$110</label>
                </div>
              </div>
              <div className="overviewPotsValuesRight">
                <div className="valueBox">
                  <label className="valueBoxTitle">Gift</label>
                  <label className="valueBoxValue">40$</label>
                </div>
                <div className="valueBox">
                  <label className="valueBoxTitle">New Laptop</label>
                  <label className="valueBoxValue">$10</label>
                </div>
              </div>
            </div>
          </div>
          <div className="overviewTransactions">
            <div className="overviewHeader">
              <h2 className="overviewHeaderTitle">Transactions</h2>
              <a className="overviewHeaderLink" href="//">
                View All
                <img className="overviewHeaderLink" alt="triangle icon" aria-hidden="true" />
              </a>
            </div>
            <div className="overviewTransactionRow">
              <img
                className="overviewTransactionRowImage"
                alt="image of payment partner"
                aria-hidden="true"
                src="./"
              />
              <label className="overviewTransactionRowName">Emma Richardsen</label>
              <div className="overviewTransactionRowInfo">
                <label className="overviewTransactionRowInfoValue">+$75.50</label>
                <label className="overviewTransactionRowInfoDate">19 Aug 2024</label>
              </div>
            </div>
            <div className="overviewTransactionRow">
              <img
                className="overviewTransactionRowImage"
                alt="image of payment partner"
                aria-hidden="true"
                src="./"
              />
              <label className="overviewTransactionRowName">Savory Bites Bistro</label>
              <div className="overviewTransactionRowInfo">
                <label className="overviewTransactionRowInfoValue">-$55.50</label>
                <label className="overviewTransactionRowInfoDate">19 Aug 2024</label>
              </div>
            </div>
            <div className="overviewTransactionRow">
              <img
                className="overviewTransactionRowImage"
                alt="image of payment partner"
                aria-hidden="true"
                src="./"
              />
              <label className="overviewTransactionRowName">Daniel Carter</label>
              <div className="overviewTransactionRowInfo">
                <label className="overviewTransactionRowInfoValue">-$42.30</label>
                <label className="overviewTransactionRowInfoDate">18 Aug 2024</label>
              </div>
            </div>
            <div className="overviewTransactionRow">
              <img
                className="overviewTransactionRowImage"
                alt="image of payment partner"
                aria-hidden="true"
                src="./"
              />
              <label className="overviewTransactionRowName">Sun Park</label>
              <div className="overviewTransactionRowInfo">
                <label className="overviewTransactionRowInfoValue">+$120.00</label>
                <label className="overviewTransactionRowInfoDate">17 Aug 2024</label>
              </div>
            </div>
            <div className="overviewTransactionRow">
              <img
                className="overviewTransactionRowImage"
                alt="image of payment partner"
                aria-hidden="true"
                src="./"
              />
              <label className="overviewTransactionRowName">Urban Services Hub</label>
              <div className="overviewTransactionRowInfo">
                <label className="overviewTransactionRowInfoValue">-$65.00</label>
                <label className="overviewTransactionRowInfoDate">17 Aug 2024</label>
              </div>
            </div>
          </div>
        </div>
        <div className="overviewDetailsRight">
          <div className="overviewBudgets">
            <div className="overviewHeader">
              <h2 className="overviewHeaderTitle">Budgets</h2>
              <a className="overviewHeaderLink" href="//">
                See Details
                <img className="overviewHeaderLink" alt="triangle icon" aria-hidden="true" />
              </a>
            </div>
            <div className="overviewBudgetsContent">
              <div className="overviewBudgetsDiagramm">
                <label className="overviewBudgetsDiagrammSpend">$338</label>
                <label className="overviewBudgetsDiagrammTotal">of $975 limit</label>
              </div>
              <div className="overviewBudgetsValues">
                <div className="valueBox">
                  <label className="valueBoxTitle">Entertainment</label>
                  <label className="valueBoxValue">$50.00</label>
                </div>
                <div className="valueBox">
                  <label className="valueBoxTitle">Bills</label>
                  <label className="valueBoxValue">$750.00</label>
                </div>
                <div className="valueBox">
                  <label className="valueBoxTitle">Dining Out</label>
                  <label className="valueBoxValue">$75.00</label>
                </div>
                <div className="valueBox">
                  <label className="valueBoxTitle">Personal Care</label>
                  <label className="valueBoxValue">$100.00</label>
                </div>
              </div>
            </div>
          </div>
          <div className="overviewBills">
            <div className="overviewHeader">
              <h2 className="overviewHeaderTitle">Recurring Bills</h2>
              <a className="overviewHeaderLink" href="//">
                See Details
                <img className="overviewHeaderLink" alt="triangle icon" aria-hidden="true" />
              </a>
            </div>
            <div className="overviewBillsRow">
              <label className="overviewBillsRowTitle">Paid Bills</label>
              <label className="overviewBillsRowValue">$190.00</label>
            </div>
            <div className="overviewBillsRow">
              <label className="overviewBillsRowTitle">Total Upcoming</label>
              <label className="overviewBillsRowValue">$194.98</label>
            </div>
            <div className="overviewBillsRow">
              <label className="overviewBillsRowTitle">Due Soon</label>
              <label className="overviewBillsRowValue">$59.98</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
