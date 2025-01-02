import { ReactElement, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.scss';
import { SidebarProvider } from './components/provider/SidebarProvider';

export const renderApp = (): ReactElement | undefined => {
  const rootElement: HTMLElement | null = document.getElementById('root');

  if (rootElement) {
    const content: ReactElement = (
      <StrictMode>
        <SidebarProvider>
          <App />
        </SidebarProvider>
      </StrictMode>
    );
    createRoot(rootElement).render(content);
    return content;
  } else {
    console.error('Root element not found');
    return undefined;
  }
};

renderApp();
