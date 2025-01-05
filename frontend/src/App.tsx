import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import {
  BrowserRouter,
  BrowserRouterProps,
  MemoryRouter,
  MemoryRouterProps,
  Routes,
} from 'react-router-dom';
import React, { ReactNode, useState } from 'react';
import ScrollToTop from './components/ScrollToTop';
import { ReactFutureFlags } from './constants/ReactFutureFlags';
import { getAppRoutes, getShowcaseRoutes } from './routes';
import { useSidebar } from './globals/hooks/useSidebar';

interface AppProps {
  Router?: React.ComponentType<BrowserRouterProps | MemoryRouterProps>;
  initialEntries?: string[];
}

const App: ({ Router, initialEntries }: AppProps) => React.ReactNode = ({
  Router = BrowserRouter,
  initialEntries = ['/'],
}: AppProps): ReactNode => {
  const [isMinimized, setIsMinimized] = useState<boolean>(() => {
    return JSON.parse(localStorage.getItem('isMinimized') ?? 'false');
  });
  const { isHidden } = useSidebar();

  const handleSidebarMinimize = (minimized: boolean) => {
    setIsMinimized(minimized);
  };

  const routes = (
    <Routes>
      {getAppRoutes()}
      {getShowcaseRoutes()}
    </Routes>
  );

  const router =
    Router === MemoryRouter ? (
      <MemoryRouter initialEntries={initialEntries} future={ReactFutureFlags}>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section
          className={`content ${isMinimized ? 'minimized' : ''} ${isHidden ? 'hidden' : ''}`}
        >
          {routes}
        </section>
      </MemoryRouter>
    ) : (
      <Router future={ReactFutureFlags}>
        <Sidebar onMinimize={handleSidebarMinimize} />
        <ScrollToTop />
        <section
          className={`content ${isMinimized ? 'minimized' : ''} ${isHidden ? 'hidden' : ''}`}
        >
          {routes}
        </section>
      </Router>
    );

  return (
    <>
      <div className="webapp">{router}</div>
    </>
  );
};

export default App;
