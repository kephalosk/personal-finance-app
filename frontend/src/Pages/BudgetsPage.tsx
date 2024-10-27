import './BudgetsPage.scss';
import { BudgetsDiagram } from '../components/overview/budgets/BudgetsDiagram';
import { ValueBox } from '../components/overview/ValueBox';
import { Link } from 'react-router-dom';
import { TransactionRow } from '../components/overview/transactions/TransactionRow';

export function BudgetsPage() {
  return (
    <>
      <div className="budgetsPage" data-testid="budgets-page">
        <div className="headerBar">
          <h1 className="headerBarTitle">Budgets</h1>
          <button className="headerBarButton">+ Add New Budget</button>
        </div>
        <div className="budgetsDetails">
          <div className="budgetsDetailsLeft">
            <div className="budgetsDiagramCard">
              <BudgetsDiagram />
              <div className="budgetsDiagramCardDetails">
                <label>Spending Summary</label>
                <div className="budgetsDiagramCardRow">
                  <div className="cardRowLeftBorder"></div>
                  <label className="cardRowTitle">Entertainment</label>
                  <label className="cardRowTitleCurrentAmount">$15.00</label>
                  <label className="cardRowTitleMaxAmount">of $50.00</label>
                </div>
                <hr />
                <div className="budgetsDiagramCardRow">
                  <div className="cardRowLeftBorder"></div>
                  <label className="cardRowTitle">Bills</label>
                  <label className="cardRowTitleCurrentAmount">$150.00</label>
                  <label className="cardRowTitleMaxAmount">of $750.00</label>
                </div>
                <hr />
                <div className="budgetsDiagramCardRow">
                  <div className="cardRowLeftBorder"></div>
                  <label className="cardRowTitle">Dining Out</label>
                  <label className="cardRowTitleCurrentAmount">$133.00</label>
                  <label className="cardRowTitleMaxAmount">of $75.00</label>
                </div>
                <hr />
                <div className="budgetsDiagramCardRow">
                  <div className="cardRowLeftBorder"></div>
                  <label className="cardRowTitle">Personal Care</label>
                  <label className="cardRowTitleCurrentAmount">$40.00</label>
                  <label className="cardRowTitleMaxAmount">of $100.00</label>
                </div>
              </div>
            </div>
          </div>
          <div className="budgetsDetailsRight">
            <div className="budgetCard">
              <div className="budgetCardHeader">
                <div className="budgetCardHeaderCircle"></div>
                <label className="budgetCardHeaderTitle">Entertainment</label>
                <select className="budgetCardHeaderEdit">...</select>
              </div>
              <label className="budgetCardBarLabel">Maximum of $50.00</label>
              <div className="budgetCardBarMax">
                <div className="budgetCardBarCurrent"></div>
              </div>
              <div className="budgetCardBarValues">
                <ValueBox title="Spent" value="15.00" color="dark-green" />
                <ValueBox title="Remaining" value="35.00" color="beige" />
              </div>
              <div className="budgetCardList">
                <div className="budgetCardListHeader">
                  <label className="budgetCardListHeaderLabel">Latest Spending</label>
                  <Link to="/" className="budgetCardListHeaderLink">
                    See All
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.765312 0.984685L4.51531 4.73469C4.55018 4.76951 4.57784 4.81087 4.59671 4.8564C4.61558 4.90192 4.62529 4.95072 4.62529 5C4.62529 5.04928 4.61558 5.09808 4.59671 5.1436C4.57784 5.18912 4.55018 5.23048 4.51531 5.26531L0.765313 9.01531C0.712867 9.06782 0.646022 9.10358 0.57324 9.11807C0.500458 9.13257 0.425012 9.12514 0.356454 9.09673C0.287895 9.06832 0.229307 9.02021 0.188105 8.95849C0.146903 8.89677 0.124942 8.82421 0.125 8.75L0.125 1.25C0.124941 1.17579 0.146903 1.10323 0.188105 1.0415C0.229306 0.979781 0.287895 0.931672 0.356453 0.903265C0.425012 0.874857 0.500458 0.867431 0.57324 0.881925C0.646022 0.896419 0.712867 0.93218 0.765312 0.984685Z"
                        fill="#696868"
                      />
                    </svg>
                  </Link>
                </div>
                <TransactionRow
                  name="James Thompson"
                  value={-5}
                  date="11 Aug 2024"
                  imgSrc="./src/assets/images/avatars/james-thompson.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Pixel Playground"
                  value={-10}
                  date="11 Aug 2024"
                  imgSrc="./src/assets/images/avatars/pixel-playground.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Rina Sato"
                  value={-10}
                  date="13 Jul 2024"
                  imgSrc="./src/assets/images/avatars/rina-sato.jpg"
                />
              </div>
            </div>
            <div className="budgetCard">
              <div className="budgetCardHeader">
                <div className="budgetCardHeaderCircle"></div>
                <label className="budgetCardHeaderTitle">Bills</label>
                <select className="budgetCardHeaderEdit">...</select>
              </div>
              <label className="budgetCardBarLabel">Maximum of $750.00</label>
              <div className="budgetCardBarMax">
                <div className="budgetCardBarCurrent"></div>
              </div>
              <div className="budgetCardBarValues">
                <ValueBox title="Spent" value="150.00" color="dark-green" />
                <ValueBox title="Remaining" value="600.00" color="beige" />
              </div>
              <div className="budgetCardList">
                <div className="budgetCardListHeader">
                  <label className="budgetCardListHeaderLabel">Latest Spending</label>
                  <Link to="/" className="budgetCardListHeaderLink">
                    See All
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.765312 0.984685L4.51531 4.73469C4.55018 4.76951 4.57784 4.81087 4.59671 4.8564C4.61558 4.90192 4.62529 4.95072 4.62529 5C4.62529 5.04928 4.61558 5.09808 4.59671 5.1436C4.57784 5.18912 4.55018 5.23048 4.51531 5.26531L0.765313 9.01531C0.712867 9.06782 0.646022 9.10358 0.57324 9.11807C0.500458 9.13257 0.425012 9.12514 0.356454 9.09673C0.287895 9.06832 0.229307 9.02021 0.188105 8.95849C0.146903 8.89677 0.124942 8.82421 0.125 8.75L0.125 1.25C0.124941 1.17579 0.146903 1.10323 0.188105 1.0415C0.229306 0.979781 0.287895 0.931672 0.356453 0.903265C0.425012 0.874857 0.500458 0.867431 0.57324 0.881925C0.646022 0.896419 0.712867 0.93218 0.765312 0.984685Z"
                        fill="#696868"
                      />
                    </svg>
                  </Link>
                </div>
                <TransactionRow
                  name="Spark Electric Solutions"
                  value={-100}
                  date="2 Aug 2024"
                  imgSrc="./src/assets/images/avatars/spark-electric-solutions.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Rina Sato"
                  value={-50}
                  date="2 Aug 2024"
                  imgSrc="./src/assets/images/avatars/rina-sato.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Aqua Flow Utilities"
                  value={-100}
                  date="30 Jul 2024"
                  imgSrc="./src/assets/images/avatars/aqua-flow-utilities.jpg"
                />
              </div>
            </div>
            <div className="budgetCard">
              <div className="budgetCardHeader">
                <div className="budgetCardHeaderCircle"></div>
                <label className="budgetCardHeaderTitle">Dining Out</label>
                <select className="budgetCardHeaderEdit">...</select>
              </div>
              <label className="budgetCardBarLabel">Maximum of $75.00</label>
              <div className="budgetCardBarMax">
                <div className="budgetCardBarCurrent"></div>
              </div>
              <div className="budgetCardBarValues">
                <ValueBox title="Spent" value="133.75" color="dark-green" />
                <ValueBox title="Remaining" value="0" color="beige" />
              </div>
              <div className="budgetCardList">
                <div className="budgetCardListHeader">
                  <label className="budgetCardListHeaderLabel">Latest Spending</label>
                  <Link to="/" className="budgetCardListHeaderLink">
                    See All
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.765312 0.984685L4.51531 4.73469C4.55018 4.76951 4.57784 4.81087 4.59671 4.8564C4.61558 4.90192 4.62529 4.95072 4.62529 5C4.62529 5.04928 4.61558 5.09808 4.59671 5.1436C4.57784 5.18912 4.55018 5.23048 4.51531 5.26531L0.765313 9.01531C0.712867 9.06782 0.646022 9.10358 0.57324 9.11807C0.500458 9.13257 0.425012 9.12514 0.356454 9.09673C0.287895 9.06832 0.229307 9.02021 0.188105 8.95849C0.146903 8.89677 0.124942 8.82421 0.125 8.75L0.125 1.25C0.124941 1.17579 0.146903 1.10323 0.188105 1.0415C0.229306 0.979781 0.287895 0.931672 0.356453 0.903265C0.425012 0.874857 0.500458 0.867431 0.57324 0.881925C0.646022 0.896419 0.712867 0.93218 0.765312 0.984685Z"
                        fill="#696868"
                      />
                    </svg>
                  </Link>
                </div>
                <TransactionRow
                  name="Savory Bites Bistro"
                  value={-55.5}
                  date="19 Aug 2024"
                  imgSrc="./src/assets/images/avatars/savory-bites-bistro.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Ethan Clark"
                  value={-32.5}
                  date="20 Aug 2024"
                  imgSrc="./src/assets/images/avatars/ethan-clark.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Ella Phillips"
                  value={-45}
                  date="10 Aug 2024"
                  imgSrc="./src/assets/images/avatars/ella-phillips.jpg"
                />
              </div>
            </div>
            <div className="budgetCard">
              <div className="budgetCardHeader">
                <div className="budgetCardHeaderCircle"></div>
                <label className="budgetCardHeaderTitle">Personal Care</label>
                <select className="budgetCardHeaderEdit">...</select>
              </div>
              <label className="budgetCardBarLabel">Maximum of $100.00</label>
              <div className="budgetCardBarMax">
                <div className="budgetCardBarCurrent"></div>
              </div>
              <div className="budgetCardBarValues">
                <ValueBox title="Spent" value="40.00" color="dark-green" />
                <ValueBox title="Remaining" value="60.00" color="beige" />
              </div>
              <div className="budgetCardList">
                <div className="budgetCardListHeader">
                  <label className="budgetCardListHeaderLabel">Latest Spending</label>
                  <Link to="/" className="budgetCardListHeaderLink">
                    See All
                    <svg
                      width="5"
                      height="10"
                      viewBox="0 0 5 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M0.765312 0.984685L4.51531 4.73469C4.55018 4.76951 4.57784 4.81087 4.59671 4.8564C4.61558 4.90192 4.62529 4.95072 4.62529 5C4.62529 5.04928 4.61558 5.09808 4.59671 5.1436C4.57784 5.18912 4.55018 5.23048 4.51531 5.26531L0.765313 9.01531C0.712867 9.06782 0.646022 9.10358 0.57324 9.11807C0.500458 9.13257 0.425012 9.12514 0.356454 9.09673C0.287895 9.06832 0.229307 9.02021 0.188105 8.95849C0.146903 8.89677 0.124942 8.82421 0.125 8.75L0.125 1.25C0.124941 1.17579 0.146903 1.10323 0.188105 1.0415C0.229306 0.979781 0.287895 0.931672 0.356453 0.903265C0.425012 0.874857 0.500458 0.867431 0.57324 0.881925C0.646022 0.896419 0.712867 0.93218 0.765312 0.984685Z"
                        fill="#696868"
                      />
                    </svg>
                  </Link>
                </div>
                <TransactionRow
                  name="William Harris"
                  value={-10}
                  date="5 Aug 2024"
                  imgSrc="./src/assets/images/avatars/william-harris.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Serenity Spa & Wellness"
                  value={-30}
                  date="3 Aug 2024"
                  imgSrc="./src/assets/images/avatars/serenity-spa-and-wellness.jpg"
                />
                <hr className="budgetCardListLine" />
                <TransactionRow
                  name="Serenity Spa & Wellness"
                  value={-30}
                  date="3 Jul 2024"
                  imgSrc="./src/assets/images/avatars/serenity-spa-and-wellness.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
