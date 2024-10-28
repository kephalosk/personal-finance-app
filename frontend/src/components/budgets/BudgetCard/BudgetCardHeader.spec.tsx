import { render } from '@testing-library/react';
import React from 'react';
import { BudgetCardHeader } from './BudgetCardHeader';

describe('BudgetCardHeader', () => {
  const title = 'testTitle';
  const color = 'testColor';

  const testProps = {
    title,
    color,
  };

  it('renders div budgetCardHeader', () => {
    const { container } = render(<BudgetCardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div budgetCardHeaderCircle with passed color', () => {
    const { container } = render(<BudgetCardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderCircle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(color);
  });

  it('renders label budgetCardHeaderTitle with passed title', () => {
    const { container } = render(<BudgetCardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders select budgetCardHeaderEdit', () => {
    const { container } = render(<BudgetCardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderEdit');

    expect(htmlElement).toBeInTheDocument();
  });
});
