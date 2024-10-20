import { render } from '@testing-library/react';
import { BillRow } from './BillRow';

describe('BillRow', () => {
  const title: string = 'testTitle';
  const value: string = 'testValue';
  const color: string = 'testColor';

  const testProps = {
    title,
    value,
    color,
  };

  it('renders div overviewBillsRow', () => {
    const { container } = render(<BillRow {...testProps} />);

    const htmlElement = container.querySelector('.overviewBillsRow');

    expect(htmlElement).toBeInTheDocument();
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
    expect(htmlElement).toHaveTextContent(value);
  });
});
