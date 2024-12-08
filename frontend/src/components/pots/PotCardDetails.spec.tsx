import { render } from '@testing-library/react';
import PotCardDetails from './PotCardDetails';
import { mockedPot } from '../../fixtures/MockedPots';

describe('PotCardDetails', () => {
  const testProps = {
    pot: mockedPot,
  };

  it('renders div potCardDetails', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardDetailsTotal', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsTotal');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardDetailsTotalLabel', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsTotalLabel');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardDetailsTotalAmount with passed pot.total', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsTotalAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${mockedPot.total}`);
  });

  it('renders div potCardBarMax', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardBarMax');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardBarCurrent', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardBarCurrent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardDetailsPercent', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsPercent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardDetailsPercentCurrent with correct percentage', () => {
    const percentage = (mockedPot.total / mockedPot.target) * 100;
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsPercentCurrent');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${percentage}`);
  });

  it('renders div potCardDetailsPercentTotal with passed pot.target', () => {
    const { container } = render(<PotCardDetails {...testProps} />);

    const htmlElement = container.querySelector('.potCardDetailsPercentTotal');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${mockedPot.target}`);
  });
});
