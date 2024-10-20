import './App.scss';
import { Sidebar } from './components/sidebar/Sidebar';
import { OverviewPage } from './pages/OverviewPage';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import React from 'react';
import { NoPage } from './pages/NoPage';
import { BillsPage } from './pages/BillsPage';
import { PotsPage } from './pages/PotsPage';
import { BudgetsPage } from './pages/BudgetsPage';
import { TransactionsPage } from './pages/TransactionsPage';
import PropTypes from 'prop-types';
import { AppProps } from './types/AppProps';

App.propTypes = {
  Router: PropTypes.elementType,
  initialEntries: PropTypes.arrayOf(PropTypes.string),
};

function App({ Router = BrowserRouter, initialEntries = ['/'] }: AppProps) {
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

  const router =
    Router === MemoryRouter ? (
      <MemoryRouter initialEntries={initialEntries}>
        <Sidebar />
        <section className="content">{routes}</section>
      </MemoryRouter>
    ) : (
      <Router>
        <Sidebar />
        <section className="content">{routes}</section>
      </Router>
    );

  return (
    <>
      <div className="webapp">{router}</div>
    </>
  );
}

export default App;
