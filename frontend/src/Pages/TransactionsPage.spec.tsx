import { render, screen } from '@testing-library/react';
import { TransactionsPage } from './TransactionsPage';

describe('TransactionsPage', () => {
  it('renders div transactionsPage', () => {
    const { container } = render(<TransactionsPage />);

    const htmlElement = container.querySelector('.transactionsPage');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders headline h1 of TransactionsPage', () => {
    const { container } = render(<TransactionsPage />);

    const htmlElement = container.querySelector('h1');

    expect(htmlElement).toHaveTextContent('Transactions');
  });

  it('renders div transactionsDetails', () => {
    const { container } = render(<TransactionsPage />);

    const htmlElement = container.querySelector('.transactionsDetails');

    expect(htmlElement).toBeInTheDocument();
  });

  describe('transactionsSearchbar', () => {
    it('renders react component SearchbarInput', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-input');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders label Sort by', () => {
      const { container } = render(<TransactionsPage />);

      const htmlElement = container.querySelector('.sortBy');

      expect(htmlElement).toHaveTextContent('Sort by');
    });

    it('renders react component SearchbarDropdownSort', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-dropdown-sort');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders label Category', () => {
      const { container } = render(<TransactionsPage />);

      const htmlElement = container.querySelector('.category');

      expect(htmlElement).toHaveTextContent('Category');
    });

    it('renders react component SearchbarDropdownCategory', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('searchbar-dropdown-category');

      expect(reactComponent).toBeInTheDocument();
    });
  });

  describe('transactionsTable', () => {
    it('renders div transactionsTable', () => {
      const { container } = render(<TransactionsPage />);

      const htmlElement = container.querySelector('.transactionsTable');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component TableHeader', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('table-header');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component TableRow 10 times', () => {
      render(<TransactionsPage />);

      const reactComponents = screen.getAllByTestId('table-row');

      expect(reactComponents).toHaveLength(10);
    });
  });

  describe('transactionsPagination', () => {
    it('renders div transactionsPagination', () => {
      const { container } = render(<TransactionsPage />);

      const htmlElement = container.querySelector('.transactionsPagination');

      expect(htmlElement).toBeInTheDocument();
    });

    it('renders react component PaginationButtonPrev', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-button-prev');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationPages', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-pages');

      expect(reactComponent).toBeInTheDocument();
    });

    it('renders react component PaginationButtonNext', () => {
      render(<TransactionsPage />);

      const reactComponent = screen.getByTestId('pagination-button-next');

      expect(reactComponent).toBeInTheDocument();
    });
  });
});
