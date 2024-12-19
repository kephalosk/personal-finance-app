import { render } from '@testing-library/react';
import BillRow from './BillRow';

describe('BillRow', () => {
  const title: string = 'testTitle';
  const value: number = 100;
  const color: string = 'testColor';

  const testProps = {
    title,
    value,
    color,
  };

  it('renders div overviewBillsRow with passed color', () => {
    const { container } = render(<BillRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewBillsRow');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveClass(color);
  });

  it('renders label overviewBillsRowTitle with passed title', () => {
    const { container } = render(<BillRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewBillsRowTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(title);
  });

  it('renders label overviewBillsRowValue with passed value', () => {
    const { container } = render(<BillRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewBillsRowValue');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement!.textContent).toEqual(`$${value}.00`);
  });
});
