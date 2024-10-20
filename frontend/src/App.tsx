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

function App({ Router = BrowserRouter, initialEntries = ['/'] }) {
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
      <MemoryRouter initialEntries={initialEntries}>{routes}</MemoryRouter>
    ) : (
      <Router>{routes}</Router>
    );

  return (
    <>
      <div className="webapp">
        <Sidebar />
        <section className="content">{router}</section>
      </div>
    </>
  );
}

export default App;
