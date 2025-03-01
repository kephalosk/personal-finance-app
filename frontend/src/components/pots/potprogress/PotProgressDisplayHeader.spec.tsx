import { render } from '@testing-library/react';
import PotProgressDisplayHeader from './PotProgressDisplayHeader';

describe('PotProgressDisplayHeader', (): void => {
  const newTotal: number = 123;

  const testProps: {
    newTotal: number;
  } = {
    newTotal,
  };

  const headerTitle: string = 'New Amount';
  const headerValue: string = `${newTotal.toFixed(0)}`;

  it('renders div potProgressDisplayHeader', (): void => {
    const { container } = render(<PotProgressDisplayHeader {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayHeader');

    expect(element).toBeInTheDocument();
  });

  it('renders label potProgressDisplayHeaderTitle with correct title', (): void => {
    const { container } = render(<PotProgressDisplayHeader {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayHeaderTitle');

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(headerTitle);
  });

  it('renders label potProgressDisplayHeaderValue with passed prop newTotal', (): void => {
    const { container } = render(<PotProgressDisplayHeader {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayHeaderValue');

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(`$${headerValue}`);
  });
});
