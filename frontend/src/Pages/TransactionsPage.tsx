import './TransactionsPage.scss';

export function TransactionsPage() {
  return (
    <>
      <div className="transactionsPage" data-testid="transactions-page">
        <h1>Transactions</h1>
        <div className="transactionsDetails">
          <div className="transactionsSearchbar">
            <div className="searchbarInputContainer">
              <div className="searchbarInputRelative">
                <input className="searchbarInput" placeholder="Search transactions" />
                <img
                  className="searchbarInputLense"
                  alt="icon of lense"
                  aria-hidden="true"
                  src="./src/assets/images/icon-search.svg"
                />
              </div>
            </div>
            <label className="searchbarLabelSort">Sort by</label>
            <select
              className="searchbarDropdownSort"
              value="selected"
              id="options"
              onChange={() => {}}
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="atoz">A to Z</option>
              <option value="ztoa">Z to A</option>
              <option value="highest">Highest</option>
              <option value="lowest">Lowest</option>
            </select>
            <label className="searchbarLabelCategory">Category</label>
            <select
              className="searchbarDropdownCategory"
              value="selected"
              id="options"
              onChange={() => {}}
            >
              <option value="all">All Transactions</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills</option>
              <option value="groceries">Groceries</option>
              <option value="dining">Dining Out</option>
              <option value="transportation">Transportation</option>
              <option value="personalcare">Personal Care</option>
              <option value="education">Education</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="shopping">Shopping</option>
              <option value="general">General</option>
            </select>
          </div>
          <div className="transactionsTable">
            <div className="transactionsTableHeader">
              <label className="tableColumnName">Recipient / Sender</label>
              <label className="tableColumnCategory">Category</label>
              <label className="tableColumnDate">Transaction Date</label>
              <label className="tableColumnAmount">Amount</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/emma-richardson.jpg"
                />
                <label className="tableRowPartnerName">Emma Richardson</label>
              </div>
              <label className="tableRowCategory">General</label>
              <label className="tableRowDate">19 Aug 2024</label>
              <label className={'tableRowValue'}>+$75.50</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/savory-bites-bistro.jpg"
                />
                <label className="tableRowPartnerName">Savory Bites Bistro</label>
              </div>
              <label className="tableRowCategory">Dining Out</label>
              <label className="tableRowDate">19 Aug 2024</label>
              <label className={'tableRowValue'}>-$55.50</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/daniel-carter.jpg"
                />
                <label className="tableRowPartnerName">Daniel Carter</label>
              </div>
              <label className="tableRowCategory">General</label>
              <label className="tableRowDate">18 Aug 2024</label>
              <label className={'tableRowValue'}>-$42.30</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/sun-park.jpg"
                />
                <label className="tableRowPartnerName">Sun Park</label>
              </div>
              <label className="tableRowCategory">General</label>
              <label className="tableRowDate">17 Aug 2024</label>
              <label className={'tableRowValue'}>+$120.00</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/urban-services-hub.jpg"
                />
                <label className="tableRowPartnerName">Urban Services Hub</label>
              </div>
              <label className="tableRowCategory">General</label>
              <label className="tableRowDate">17 Aug 2024</label>
              <label className={'tableRowValue'}>-$65.00</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/liam-hughes.jpg"
                />
                <label className="tableRowPartnerName">Liam Hughes</label>
              </div>
              <label className="tableRowCategory">Groceries</label>
              <label className="tableRowDate">15 Aug 2024</label>
              <label className={'tableRowValue'}>+$65.75</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/lily-ramirez.jpg"
                />
                <label className="tableRowPartnerName">Lily Ramirez</label>
              </div>
              <label className="tableRowCategory">General</label>
              <label className="tableRowDate">14 Aug 2024</label>
              <label className={'tableRowValue'}>+$50.00</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/ethan-clark.jpg"
                />
                <label className="tableRowPartnerName">Ethan Clark</label>
              </div>
              <label className="tableRowCategory">Dining Out</label>
              <label className="tableRowDate">13 Aug 2024</label>
              <label className={'tableRowValue'}>-$32.50</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/james-thompson.jpg"
                />
                <label className="tableRowPartnerName">James Thompson</label>
              </div>
              <label className="tableRowCategory">Entertainment</label>
              <label className="tableRowDate">11 Aug 2024</label>
              <label className={'tableRowValue'}>-$5.00</label>
            </div>
            <div className="transactionsTableRow">
              <div className="tableRowPartner">
                <img
                  className="tableRowPartnerImage"
                  alt="icon of payment partner"
                  aria-hidden="true"
                  src="./src/assets/images/avatars/pixel-playground.jpg"
                />
                <label className="tableRowPartnerName">Pixel Playground</label>
              </div>
              <label className="tableRowCategory">Entertainment</label>
              <label className="tableRowDate">11 Aug 2024</label>
              <label className={'tableRowValue'}>-$10.00</label>
            </div>
          </div>
          <div className="transactionsPagination">
            <button className="paginationButtonPrev">
              <img
                className="paginationButtonPrevCaret"
                alt="icon of caret left"
                aria-hidden="true"
                src="./src/assets/images/icon-caret-left.svg"
              />
              Prev
            </button>
            <div className="paginationPages">
              <button className="pagination1">1</button>
              <button className="pagination2">2</button>
              <button className="pagination3">3</button>
              <button className="pagination4">4</button>
              <button className="pagination5">5</button>
            </div>
            <button className="paginationButtonNext">
              Next
              <img
                className="paginationButtonNextCaret"
                alt="icon of caret right"
                aria-hidden="true"
                src="./src/assets/images/icon-caret-right.svg"
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
