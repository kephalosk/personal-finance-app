import React from 'react';
import { render } from '@testing-library/react';
import PotCardButtons from './PotCardButtons';

describe('PotCardButtons', (): void => {
  it('renders div potCardButtons', () => {
    const { container } = render(<PotCardButtons />);

    const htmlElement: HTMLElement | null = container.querySelector('.potCardButtons');

    expect(htmlElement).toBeInTheDocument();
  });

  it('renders div potCardButtonAdd with correct text', () => {
    const { container } = render(<PotCardButtons />);

    const htmlElement: HTMLElement | null = container.querySelector('.add');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('+ Add Money');
  });

  it('renders div potCardButtonWithdraw with correct text', () => {
    const { container } = render(<PotCardButtons />);

    const htmlElement: HTMLElement | null = container.querySelector('.withdraw');

    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveTextContent('Withdraw');
  });
});
