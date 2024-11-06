import { render, screen } from '@testing-library/react';
import { PotsSummary } from './PotsSummary';

describe('PotsSummary', () => {
  const potSum: number = 100;
  const testProps = {
    potSum,
  };
  it('renders div overviewPotsSummary', () => {
    const { container } = render(<PotsSummary {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the pot icon', () => {
    render(<PotsSummary {...testProps} />);

    const imgElement: HTMLElement = screen.getByAltText('pot icon');

    expect(imgElement).toHaveAttribute('src', '/images/icon-pot.svg');
  });

  it('renders div overviewPotsSummaryContent', () => {
    const { container } = render(<PotsSummary {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the label overviewPotsSummaryContentTitle', () => {
    const { container } = render(<PotsSummary {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContentTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Total Saved');
  });

  it('renders the label div overviewPotsSummaryContentValue with passed potSum', () => {
    const { container } = render(<PotsSummary {...testProps} />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContentValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${potSum}`);
  });
});
