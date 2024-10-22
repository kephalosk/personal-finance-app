import { fireEvent, render, screen } from '@testing-library/react';
import { TransactionsPage } from './TransactionsPage';
import React from 'react';

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

    it('increases page Number when next button is clicked', () => {
      const { container, getByTestId } = render(<TransactionsPage />);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const button = getByTestId('pagination-button-next');
      fireEvent.click(button);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');
    });

    it('does not increases page Number when isMaxIndex is true and next button is clicked', () => {
      const { container, getByTestId } = render(<TransactionsPage />);
      const buttons = container.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[4]);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('5');

      const button = getByTestId('pagination-button-next');
      fireEvent.click(button);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('5');
    });

    it('decreases page Number when prev button is clicked', () => {
      const { container, getByTestId } = render(<TransactionsPage />);
      const buttonNext = getByTestId('pagination-button-next');
      fireEvent.click(buttonNext);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('2');

      const buttonPrev = getByTestId('pagination-button-prev');
      fireEvent.click(buttonPrev);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');
    });

    it('does not decreases page Number when pageIndex is 0 and prev button is clicked', () => {
      const { container, getByTestId } = render(<TransactionsPage />);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttonPrev = getByTestId('pagination-button-prev');
      fireEvent.click(buttonPrev);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');
    });

    it('changes page Number when a pageButton is clicked', () => {
      const { container } = render(<TransactionsPage />);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('1');

      const buttons = container.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[3]);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('4');
    });

    it('does not change page Number when same pageButton is clicked', () => {
      const { container } = render(<TransactionsPage />);
      const buttons = container.querySelectorAll('.paginationPagesButton');
      fireEvent.click(buttons[2]);
      let activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('3');

      fireEvent.click(buttons[2]);

      activePageButton = container.querySelector('.isActive');
      expect(activePageButton).toHaveTextContent('3');
    });
  });
});
