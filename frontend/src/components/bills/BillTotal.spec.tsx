import { render, screen } from '@testing-library/react';
import React from 'react';
import { BillTotal } from './BillTotal';
import { MemoryRouter } from 'react-router-dom';
import { ReactFutureFlags } from '../../constants/ReactFutureFlags';

describe('BillTotal', () => {
  const sum = 100;
  const isLoading = false;
  const testProps = {
    sum,
    isLoading,
  };

  it('renders div billTotal', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotal');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders img billTotal', () => {
    render(<BillTotal {...testProps} />);

    const htmlElement = screen.getByAltText('icon of recurring bills');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('src', '/images/icon-recurring-bills.svg');
  });

  it('renders div billTotalLabelWrapper', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalLabelWrapper');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label billTotalTitle', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalTitle');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders label billTotalAmount with passed sum', () => {
    const { container } = render(<BillTotal {...testProps} />);

    const htmlElement = container.querySelector('.billTotalAmount');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent(`${sum}.00`);
  });

  it('renders LoadingSpinner if isLoading is true', () => {
    const { container } = render(
      <MemoryRouter future={ReactFutureFlags}>
        <BillTotal {...testProps} isLoading={true} />
      </MemoryRouter>
    );

    const htmlElement = container.querySelector('.loadingSpinner');

    expect(htmlElement).toBeInTheDocument();
  });
});
