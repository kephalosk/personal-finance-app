import { createRoot } from 'react-dom/client';
import { renderApp } from './main';

jest.mock('react-dom/client', () => ({
  createRoot: jest.fn(() => ({
    render: jest.fn(),
  })),
}));

describe('main', () => {
  it('calls createRoot if root element exists', () => {
    document.body.innerHTML = '<div id="root"></div>';

    renderApp();
    const rootElement = document.getElementById('root');

    expect(rootElement).not.toBeNull();
    expect(createRoot).toHaveBeenCalledWith(rootElement);
  });

  it('logs an error if root element does not exist', () => {
    document.body.innerHTML = '';

    renderApp();

    expect(console.error).toHaveBeenCalledWith('Root element not found');
  });
});
