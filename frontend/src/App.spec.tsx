import { render, screen } from '@testing-library/react';
import App from './App';
import { ProjectName } from './Constants/ProjectName';

it('renders Sidebar', () => {
  render(<App />);

  const linkElement = screen.getByText(ProjectName);

  expect(linkElement).toBeInTheDocument();
});
