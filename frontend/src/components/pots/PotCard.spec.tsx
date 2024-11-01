import { PotCardDetailsProps } from '../../types/PotCardDetailsProps';
import { render, screen } from '@testing-library/react';
import { pot } from '../../fixtures/MockedPots';
import { PotCard } from './PotCard';

describe('PotCard', () => {
  const testProps: PotCardDetailsProps = {
    pot,
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

    const htmlElement = container.querySelector('.potCardButtonAdd');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('+ Add Money');
  });

  it('renders div potCardButtonWithdraw with correct text', () => {
    const { container } = render(<PotCard {...testProps} />);

    const htmlElement = container.querySelector('.potCardButtonWithdraw');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Withdraw');
  });
});
