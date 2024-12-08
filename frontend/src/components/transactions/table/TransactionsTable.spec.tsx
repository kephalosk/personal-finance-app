import { render, screen } from '@testing-library/react';
import React from 'react';
import { mockedTransactions } from '../../../fixtures/MockedTransactions';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import TransactionsTable from './TransactionsTable';
import TableRow from './TableRow';
import TableHeader from './TableHeader';
import TableRowSmall from './TableRowSmall';

jest.mock('./TableHeader', () => jest.fn(() => <div data-testid="table-header"></div>));
jest.mock('./TableRow', () => jest.fn(() => <div data-testid="table-row"></div>));
jest.mock('./TableRowSmall', () => jest.fn(() => <div data-testid="table-row-small"></div>));

jest.mock('../../../globals/hooks/useIsSmallScreen', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('TransactionsTable', () => {
  const currentIndexedTransactions = mockedTransactions;
  const testProps = {
    currentIndexedTransactions,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('isSmallScreen === false', () => {
    beforeEach(() => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(false);
    });

    it('renders div transactionsTable', () => {
      const { container } = render(<TransactionsTable {...testProps} />);

      const htmlElement = container.querySelector('.transactionsTable');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders component TableHeader', () => {
      render(<TransactionsTable {...testProps} />);

      const component = screen.getByTestId('table-header');

      expect(component).toBeInTheDocument();
      expect(TableHeader).toHaveBeenCalled();
    });

    it('renders components TableRow with passed prop currentIndexedTransactions', () => {
      render(<TransactionsTable {...testProps} />);

      const components = screen.getAllByTestId('table-row');

      expect(components).toHaveLength(3);
      currentIndexedTransactions.forEach((transaction, index) => {
        expect(TableRow).toHaveBeenNthCalledWith(
          index + 1,
          {
            category: transaction.category,
            date: transaction.date,
            imgSrc: transaction.avatar,
            name: transaction.name,
            value: transaction.amount,
          },
          {}
        );
      });
    });
  });

  describe('isSmallScreen === true', () => {
    beforeEach(() => {
      (useIsSmallScreen as jest.Mock).mockReturnValue(true);
    });

    it('renders div transactionsTable for mobile', () => {
      const { container } = render(<TransactionsTable {...testProps} />);

      const htmlElement = container.querySelector('.transactionsTable');

      expect(htmlElement).toBeInTheDocument();
    });

    it('does not render component TableHeader for mobile', () => {
      render(<TransactionsTable {...testProps} />);

      const component = screen.queryByTestId('table-header');

      expect(component).not.toBeInTheDocument();
      expect(TableHeader).not.toHaveBeenCalled();
    });

    it('renders components TableRowSmall with passed prop currentIndexedTransactions for mobile', () => {
      render(<TransactionsTable {...testProps} />);

      const components = screen.getAllByTestId('table-row-small');

      expect(components).toHaveLength(3);
      currentIndexedTransactions.forEach((transaction, index) => {
        expect(TableRowSmall).toHaveBeenNthCalledWith(
          index + 1,
          {
            category: transaction.category,
            date: transaction.date,
            imgSrc: transaction.avatar,
            name: transaction.name,
            value: transaction.amount,
          },
          {}
        );
      });
    });

    it('renders hr transactionsTableLine currentIndexedTransactions.length - 1 times', () => {
      const { container } = render(<TransactionsTable {...testProps} />);

      const elements = container.querySelectorAll('.transactionsTableLine');

      expect(elements).toHaveLength(currentIndexedTransactions.length - 1);
    });
  });
});
