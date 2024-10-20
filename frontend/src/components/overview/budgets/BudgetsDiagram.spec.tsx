import { render } from '@testing-library/react';
import { BudgetsDiagram } from './BudgetsDiagram';

describe('BudgetsDiagram', () => {
  it('renders div overviewBudgetsDiagram', () => {
    const { container } = render(<BudgetsDiagram />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagram');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewBudgetsDiagramCircleBig', () => {
    const { container } = render(<BudgetsDiagram />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramCircleBig');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div overviewBudgetsDiagramCircleSmall', () => {
    const { container } = render(<BudgetsDiagram />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramCircleSmall');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewBudgetsDiagramSpend', () => {
    const { container } = render(<BudgetsDiagram />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramSpend');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label overviewBudgetsDiagramTotal', () => {
    const { container } = render(<BudgetsDiagram />);

    const htmlElement = container.querySelector('.overviewBudgetsDiagramTotal');

    expect(htmlElement).toBeInTheDocument();
  });
});
