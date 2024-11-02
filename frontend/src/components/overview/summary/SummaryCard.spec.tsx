import { SummaryCard } from './SummaryCard';
import { render } from '@testing-library/react';

describe('SummaryCard', () => {
  const title: string = 'testTitle';
  const value: number = 100;

  const testProps = {
    title,
    value,
  };

  it('renders div overviewSummaryCard', () => {
    const { container } = render(<SummaryCard {...testProps} />);

    const htmlElement = container.querySelector('.overviewSummaryCard');

    expect(htmlElement).toBeInTheDocument();
  });

  it('passes the prop title of a SummaryCard', () => {
    const { container } = render(<SummaryCard {...testProps} />);

    const htmlElement = container.querySelector('.overviewSummaryCardTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('passes the prop value of a SummaryCard', () => {
    const { container } = render(<SummaryCard {...testProps} />);

    const htmlElement = container.querySelector('.overviewSummaryCardValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${value}`);
  });
});
