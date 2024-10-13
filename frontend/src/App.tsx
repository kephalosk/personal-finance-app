import './App.scss';

function App() {
  return (
    <>
      <section className="sidebar">
        <h1>Philipp Kraatz&#39; finance</h1>
        <div className="sidebarList">
          <div className="sidebarListEntry">
            <img src="./src/assets/images/icon-nav-overview.svg" alt="overview icon" aria-hidden="true" />
            <label>Overview</label>
          </div>
          <div className="sidebarListEntry">
            <img src="./src/assets/images/icon-nav-transactions.svg" alt="transactions icon" aria-hidden="true" />
            <label>Transactions</label>
          </div>
          <div className="sidebarListEntry">
            <img src="./src/assets/images/icon-nav-budgets.svg" alt="budgets icon" aria-hidden="true" />
            <label>Budgets</label>
          </div>
          <div className="sidebarListEntry">
            <img src="./src/assets/images/icon-nav-pots.svg" alt="pots icon" aria-hidden="true" />
            <label>Pots</label>
          </div>
          <div className="sidebarListEntry">
            <img src="./src/assets/images/icon-nav-recurring-bills.svg" alt="recurring bills icon" aria-hidden="true" />
            <label>Recurring Bills</label>
          </div>
        </div>
        <div className="sidebarShrink">
          <img src="./src/assets/images/icon-minimize-menu.svg" alt="minimize icon" aria-hidden="true" />
          <label>Minimize Menu</label>
        </div>
      </section>
      <section className="content"></section>
    </>
  );
}

export default App;
