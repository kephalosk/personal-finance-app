import { render } from '@testing-library/react';
import React from 'react';
import { CardHeader } from './CardHeader';

describe('CardHeader', () => {
  const title = 'testTitle';
  const color = 'testColor';

  const testProps = {
    title,
    color,
  };

  it('renders div CardHeader', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeader');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div CardHeaderCircle with passed color', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderCircle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(color);
  });

  it('renders label CardHeaderTitle with passed title', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders select CardHeaderEditIcon', () => {
    const { container } = render(<CardHeader {...testProps} />);

    const htmlElement = container.querySelector('.budgetCardHeaderEditIcon');

    expect(htmlElement).toBeInTheDocument();
  });
});
