import './App.scss';
import { Sidebar } from './components/sidebar/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import { NoPage } from './pages/NoPage';
import { BillsPage } from './pages/BillsPage';
import { PotsPage } from './pages/PotsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import PropTypes from 'prop-types';
import { AppProps } from './model/props/AppProps';

App.propTypes = {
  Router: PropTypes.elementType,
  initialEntries: PropTypes.arrayOf(PropTypes.string),
};

function App({ Router = BrowserRouter, initialEntries = ['/'] }: AppProps) {
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
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </MemoryRouter>
    ) : (
      <Router>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <section className={`content ${isMinimized ? 'minimized' : ''}`}>{routes}</section>
      </Router>
    );

  return (
    <>
      <div className="webapp">{router}</div>
    </>
  );
}

export default App;
