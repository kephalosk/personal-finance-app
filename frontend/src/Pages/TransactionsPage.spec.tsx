import { render } from '@testing-library/react';
import { TransactionsPage } from './TransactionsPage';

describe('TransactionsPage', () => {
  it('renders div transactionsPage', () => {
    const { container } = render(<TransactionsPage />);

    const htmlElement = container.querySelector('.transactionsPage');

    expect(htmlElement).toBeInTheDocument();
  });
});
