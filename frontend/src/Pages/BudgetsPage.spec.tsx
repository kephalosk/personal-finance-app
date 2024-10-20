import { render } from '@testing-library/react';
import { BudgetsPage } from './BudgetsPage';

describe('BudgetsPage', () => {
  it('renders div budgetsPage', () => {
    const { container } = render(<BudgetsPage />);

    const htmlElement = container.querySelector('.budgetsPage');

    expect(htmlElement).toBeInTheDocument();
  });
});
