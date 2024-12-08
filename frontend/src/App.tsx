import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import OverviewPage from './pages/OverviewPage';
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
import BillsPage from './pages/BillsPage';
import PotsPage from './pages/PotsPage';
import BudgetsPage from './pages/BudgetsPage';
import TransactionsPage from './pages/TransactionsPage';
import ScrollToTop from './components/ScrollToTop';
import { ReactFutureFlags } from './constants/ReactFutureFlags';

interface AppProps {
  Router?: React.ComponentType<BrowserRouterProps | MemoryRouterProps>;
  initialEntries?: string[];
}

const App: ({ Router, initialEntries }: AppProps) => React.ReactNode = ({
  Router = BrowserRouter,
  initialEntries = ['/'],
}: AppProps): React.ReactNode => {
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
      <MemoryRouter initialEntries={initialEntries} future={ReactFutureFlags}>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </MemoryRouter>
    ) : (
      <Router future={ReactFutureFlags}>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </Router>
    );

  return (
    <>
      <div className="webapp">{router}</div>
    </>
  );
};

export default App;
