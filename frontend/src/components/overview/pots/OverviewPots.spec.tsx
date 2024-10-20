import { render, screen } from '@testing-library/react';
import { OverviewPots } from './OverviewPots';

describe('OverviewPots', () => {
  it('renders div overviewPots', () => {
    const { container } = render(<OverviewPots />);

    const htmlElement = container.querySelector('.overviewPots');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component OverviewHeader', () => {
    render(<OverviewPots />);

    const reactComponent = screen.getByTestId('overview-header');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPotsContent', () => {
    const { container } = render(<OverviewPots />);

    const htmlElement = container.querySelector('.overviewPotsContent');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component PotsSummary', () => {
    render(<OverviewPots />);

    const reactComponent = screen.getByTestId('pots-summary');

    expect(reactComponent).toBeInTheDocument();
  });

  it('renders div overviewPotsValues', () => {
    const { container } = render(<OverviewPots />);

    const htmlElement = container.querySelector('.overviewPotsValues');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewPotsValuesRow', () => {
    const { container } = render(<OverviewPots />);

    const htmlElement = container.querySelector('.overviewPotsValuesRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders react component ValueBox 4 times', () => {
    render(<OverviewPots />);

    const reactComponents = screen.getAllByTestId('value-box');

    expect(reactComponents).toHaveLength(4);
  });
});
