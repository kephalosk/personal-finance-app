import './App.scss';
import { Sidebar } from './components/sidebar/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import {
  BrowserRouter,
  BrowserRouterProps,
  MemoryRouter,
  MemoryRouterProps,
  Route,
  Routes,
} from 'react-router-dom';
import React, { useState } from 'react';
import NoPage from './pages/NoPage';
import { BillsPage } from './pages/BillsPage';
import { PotsPage } from './pages/PotsPage';
import BudgetsPage from './pages/BudgetsPage';
import TransactionsPage from './pages/TransactionsPage';
import ScrollToTop from './components/ScrollToTop';

interface AppProps {
  Router?: React.ComponentType<BrowserRouterProps | MemoryRouterProps>;
  initialEntries?: string[];
}

const App: ({ Router, initialEntries }: AppProps) => React.ReactNode = ({
  Router = BrowserRouter,
  initialEntries = ['/'],
}: AppProps) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isMinimized') ?? 'false');
  });

  const routes = (
    <Routes>
      <Route path="/" element={<OverviewPage />} />
      <Route path="transactions" element={<TransactionsPage />} />
      <Route path="budgets" element={<BudgetsPage />} />
      <Route path="pots" element={<PotsPage />} />
      <Route path="bills" element={<BillsPage />} />
      <Route path="*" element={<NoPage />} />
    </Routes>
  );

  const handleSidebarMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
  };

  const router =
    Router === MemoryRouter ? (
      <MemoryRouter initialEntries={initialEntries}>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </MemoryRouter>
    ) : (
      <Router>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </Router>
    );

  const [isHidden, setIsHidden] = useState<boolean>(false);
  const closeForm = () => {
    setIsHidden(true);
  };

  return (
    <>
      <div className="webapp">
        {router}
        <div className={`backgroundOverlay ${isHidden ? 'isHidden' : ''}`}></div>
        <div className={`formOverlay ${isHidden ? 'isHidden' : ''}`}>
          <header className="formOverlayHeader">
            <div className="formOverlayHeaderBar">
              <h2 className="formOverlayHeaderBarTitle">Add New Budget</h2>
              <img
                className="formOverlayHeaderBarIcon"
                alt="closing icon"
                aria-hidden="false"
                src="/images/icon-close-modal.svg"
                tabIndex={0}
                onClick={closeForm}
              />
            </div>
            <p className="formOverlayHeaderText">
              Choose a category to set a spending budget. These categories can help you monitor
              spending.
            </p>
          </header>
        </div>
      </div>
    </>
  );
};

export default App;
