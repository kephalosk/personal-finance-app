import { render, screen } from '@testing-library/react';
import { mockedPot } from '../../fixtures/MockedPots';
import { PotCard } from './PotCard';
import { MemoryRouter } from 'react-router-dom';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

describe('PotCard', () => {
  const testProps = {
    pot: mockedPot,
    isLoading: false,
  };

  it('renders div potCard', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement = container.querySelector('.potCard');

    expect(htmlElement).toBeInTheDocument();
  });
  it('renders component CardHeader', () => {
    render(<PotCard {...testProps} />);

    const htmlElement = screen.getByTestId('card-header');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders component PotCardDetails', () => {
    render(<PotCard {...testProps} />);

    const htmlElement = screen.getByTestId('pot-card-details');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardButtons', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement = container.querySelector('.potCardButtons');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardButtonAdd with correct text', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement = container.querySelector('.add');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('+ Add Money');
  });

  it('renders div potCardButtonWithdraw with correct text', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement = container.querySelector('.withdraw');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Withdraw');
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <PotCard {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');
    const components = screen.queryAllByTestId('pot-card-details');

    expect(htmlElement).toBeInTheDocument();
    expect(components).toHaveLength(0);
  });
});
