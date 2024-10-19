import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders div webapp', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.webapp');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component Sidebar', () => {
    render(<App />);

    const reactComponent = screen.getByTestId('sidebar');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders section content', () => {
    const { container } = render(<App />);

    const htmlElement = container.querySelector('.content');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewPage', () => {
    render(<App />);

    const reactComponent = screen.getByTestId('overview-page');

    expect(reactComponent).toBeInTheDocument();
  });
});
