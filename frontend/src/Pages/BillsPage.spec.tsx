import { render } from '@testing-library/react';
import { BillsPage } from './BillsPage';

describe('BillsPage', () => {
  it('renders div billsPage', () => {
    const { container } = render(<BillsPage />);

    const htmlElement = container.querySelector('.billsPage');

    expect(htmlElement).toBeInTheDocument();
  });
});
