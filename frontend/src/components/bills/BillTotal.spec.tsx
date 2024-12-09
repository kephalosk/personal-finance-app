import { render, screen } from '@testing-library/react';
import React from 'react';
import BillTotal from './BillTotal';
import LoadingSpinner from '../LoadingSpinner';

jest.mock('../LoadingSpinner', () => jest.fn(() => <div data-testid="loading-spinner"></div>));

describe('BillTotal', () => {
  const sum = 100;
  const isLoading = false;

  const testProps = {
    sum,
    isLoading,
  };

  it('renders component LoadingSpinner if passed prop isLoading is true', () => {
    render(<BillTotal {...testProps} isLoading={true} />);

    const htmlElement = screen.getByTestId('loading-spinner');

    expect(htmlElement).toBeInTheDocument();
    expect(LoadingSpinner).toHaveBeenCalled();
  });

  it('does not render component LoadingSpinner if passed prop isLoading is false', () => {
    render(<BillTotal {...testProps} isLoading={false} />);

    const htmlElement = screen.queryByTestId('loading-spinner');

    expect(htmlElement).not.toBeInTheDocument();
    expect(LoadingSpinner).not.toHaveBeenCalled();
  });

  it('renders div billTotal', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotal');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div billTotalImageWrapper', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalImageWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billTotal', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalImage');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', '/images/icon-recurring-bills.svg');
    expect(htmlElement).toHaveAttribute('alt', 'icon of recurring bills');
  });

  it('renders div billTotalLabelWrapper', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalLabelWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label billTotalTitle with correct text', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalTitle');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Total Bills');
  });

  it('renders label billTotalAmount with passed prop sum', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${sum}.00`);
  });
});
