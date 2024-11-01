import { render, screen } from '@testing-library/react';
import { PotsPage } from './PotsPage';

describe('PotsPage', () => {
  it('renders component HeaderBar', () => {
    render(<PotsPage />);

    const htmlElement = screen.getByTestId('header-bar');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potPageGrid', () => {
    const { container } = render(<PotsPage />);

    const htmlElement = container.querySelector('.potPageGrid');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders components PotCard', () => {
    render(<PotsPage />);

    const components = screen.getAllByTestId('pot-card');

    expect(components).toHaveLength(5);
  });
});
