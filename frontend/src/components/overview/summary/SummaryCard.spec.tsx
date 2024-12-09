import SummaryCard from './SummaryCard';
import { render, screen } from '@testing-library/react';
import LoadingSpinner from '../../LoadingSpinner';

jest.mock('../../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));

describe('SummaryCard', () => {
  const title: string = 'testTitle';
  const value: number = 100;
  const isLoading = false;
  const isInverted = false;

  const testProps = {
    title,
    value,
    isLoading,
    isInverted,
  };

  describe('isInverted === false', () => {
    it('renders div overviewSummaryCard with passed prop isInverted === false', () => {
      const { container } = render(<SummaryCard {...testProps} />);

      const htmlElement = container.querySelector('.overviewSummaryCard');

      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).not.toHaveClass('inverted');
    });

    it('renders label overviewSummaryCardTitle with passed prop title', () => {
      const { container } = render(<SummaryCard {...testProps} />);

      const htmlElement = container.querySelector('.overviewSummaryCardTitle');

      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveTextContent(title);
      expect(htmlElement).not.toHaveClass('inverted');
    });

    it('renders label overviewSummaryCardValue with passed prop value', () => {
      const { container } = render(<SummaryCard {...testProps} />);

      const htmlElement = container.querySelector('.overviewSummaryCardValue');

      expect(htmlElement).toBeInTheDocument();
      expect(htmlElement).toHaveTextContent(`${value}`);
    });
  });

  describe('isInverted === true', () => {
    it('renders div overviewSummaryCard with passed prop isInverted === true', () => {
      const { container } = render(<SummaryCard {...testProps} isInverted={true} />);

      const htmlElement = container.querySelector('.overviewSummaryCard');

      expect(htmlElement).toHaveClass('inverted');
    });

    it('renders label overviewSummaryCardTitle with passed prop isInverted === true', () => {
      const { container } = render(<SummaryCard {...testProps} isInverted={true} />);

      const htmlElement = container.querySelector('.overviewSummaryCardTitle');

      expect(htmlElement).toHaveClass('inverted');
    });

    it('renders label overviewSummaryCardValue with passed prop isInverted === true', () => {
      const { container } = render(<SummaryCard {...testProps} isInverted={true} />);

      const htmlElement = container.querySelector('.overviewSummaryCardValue');

      expect(htmlElement).toHaveClass('inverted');
    });
  });

  it('renders component LoadingSpinner if isLoading is true', () => {
    render(<SummaryCard {...testProps} isLoading={true} />);

    const component = screen.getByTestId('loading-spinner');

    expect(component).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner if isLoading is false', () => {
    render(<SummaryCard {...testProps} isLoading={false} />);

    const component = screen.queryByTestId('loading-spinner');

    expect(component).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });
});
