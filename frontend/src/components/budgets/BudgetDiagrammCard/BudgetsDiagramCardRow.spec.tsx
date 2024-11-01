import { render } from '@testing-library/react';
import React from 'react';
import { BudgetsDiagramCardRow } from './BudgetsDiagramCardRow';

describe('BudgetsDiagramCardRow', () => {
  const title = 'testTitle';
  const currentAmount = 10;
  const maxAmount = 100;
  const color = 'testColor';
  const testProps = {
    title,
    currentAmount,
    maxAmount,
    color,
  };

  it('renders div budgetsDiagramCardRow', () => {
    const { container } = render(<BudgetsDiagramCardRow {...testProps} />);

    const htmlElement = container.querySelector('.budgetsDiagramCardRow');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div cardRowLeftBorder with passed color', () => {
    const { container } = render(<BudgetsDiagramCardRow {...testProps} />);

    const htmlElement = container.querySelector('.cardRowLeftBorder');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(color);
  });

  it('renders label cardRowTitle with passed title', () => {
    const { container } = render(<BudgetsDiagramCardRow {...testProps} />);

    const htmlElement = container.querySelector('.cardRowTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders label cardRowTitleCurrentAmount with passed currentAmount', () => {
    const { container } = render(<BudgetsDiagramCardRow {...testProps} />);

    const htmlElement = container.querySelector('.cardRowTitleCurrentAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`$${currentAmount}`);
  });

  it('renders label cardRowTitleMaxAmount with passed maxAmount', () => {
    const { container } = render(<BudgetsDiagramCardRow {...testProps} />);

    const htmlElement = container.querySelector('.cardRowTitleMaxAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`of $${maxAmount}`);
  });
});
