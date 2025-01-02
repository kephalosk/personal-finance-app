import { createRoot } from 'react-dom/client';
import { renderApp } from './main';
import { isValidElement, ReactElement } from 'react';
import App from './App';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('main', () => {
  it('calls createRoot if root element exists', () => {
    document.body.innerHTML = '<div id="root"></div>';

    renderApp();
    const rootElement: HTMLElement | null = document.getElementById('root');

    expect(rootElement).not.toBeNull();
    expect(createRoot).toHaveBeenCalledWith(rootElement);
  });

  it('renders SidebarProvider', () => {
    document.body.innerHTML = '<div id="root"></div>';

    const content: ReactElement | undefined = renderApp();
    const sidebarProvider = content?.props.children;

    expect(isValidElement(sidebarProvider)).toBe(true);
  });

  it('renders App', () => {
    document.body.innerHTML = '<div id="root"></div>';

    const content: ReactElement | undefined = renderApp();
    const sidebarProvider = content?.props.children;

    expect(sidebarProvider?.props.children).toEqual(<App />);
  });

  it('logs an error if root element does not exist', () => {
    document.body.innerHTML = '';

    renderApp();

    expect(console.error).toHaveBeenCalledWith('Root element not found');
  });
});
