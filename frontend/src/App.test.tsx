import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Vite + React', () => {
  render(<App />);
  const linkElement = screen.getByText('Vite + React');
  expect(linkElement).toBeInTheDocument();
});
