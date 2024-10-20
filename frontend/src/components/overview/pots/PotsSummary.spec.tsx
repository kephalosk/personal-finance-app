import { render, screen } from '@testing-library/react';
import { PotsSummary } from './PotsSummary';

describe('PotsSummary', () => {
  it('renders div overviewPotsSummary', () => {
    const { container } = render(<PotsSummary />);

    const htmlElement = container.querySelector('.overviewPotsSummary');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the pot icon', () => {
    render(<PotsSummary />);

    const imgElement: HTMLElement = screen.getByAltText('pot icon');

    expect(imgElement).toHaveAttribute('src', './src/assets/images/icon-pot.svg');
  });

  it('renders div overviewPotsSummaryContent', () => {
    const { container } = render(<PotsSummary />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders the label overviewPotsSummaryContentTitle', () => {
    const { container } = render(<PotsSummary />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContentTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Total Saved');
  });

  it('renders the label div overviewPotsSummaryContentValue', () => {
    const { container } = render(<PotsSummary />);

    const htmlElement = container.querySelector('.overviewPotsSummaryContentValue');

    expect(htmlElement).toBeInTheDocument();
  });
});
