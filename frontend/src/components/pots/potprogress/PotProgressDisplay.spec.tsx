import { render, screen } from '@testing-library/react';
import PotProgressDisplay from './PotProgressDisplay';
import PotProgressDisplayHeader from './PotProgressDisplayHeader';
import PotProgressDisplayChart from './PotProgressDisplayChart';
import { ReactNode } from 'react';

jest.mock(
  './PotProgressDisplayHeader',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="pot-progress-display-header"></div>)
);

jest.mock(
  './PotProgressDisplayChart',
  (): jest.Mock => jest.fn((): ReactNode => <div data-testid="pot-progress-display-chart"></div>)
);

describe('PotProgressDisplay', (): void => {
  const target: number = 2000;
  const oldTotal: number = 500;
  const difference: number = 250;
  const isAddition: boolean = true;

  const testProps: {
    target: number;
    oldTotal: number;
    difference: number;
    isAddition: boolean;
  } = {
    target,
    oldTotal,
    difference,
    isAddition,
  };

  it('renders div potProgressDisplay', (): void => {
    const { container } = render(<PotProgressDisplay {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplay');

    expect(element).toBeInTheDocument();
  });

  it('renders component PotProgressDisplayHeader with new total when passed prop isAddition === true', (): void => {
    render(<PotProgressDisplay {...testProps} isAddition={true} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-header');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayHeader).toHaveBeenCalledWith({ newTotal: oldTotal + difference }, {});
  });

  it('renders component PotProgressDisplayHeader with new total when passed prop isAddition === false', (): void => {
    render(<PotProgressDisplay {...testProps} isAddition={false} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-header');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayHeader).toHaveBeenCalledWith({ newTotal: oldTotal - difference }, {});
  });

  it('renders component PotProgressDisplayHeader with negative new total', (): void => {
    render(
      <PotProgressDisplay {...testProps} oldTotal={100} difference={500} isAddition={false} />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-header');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayHeader).toHaveBeenCalledWith({ newTotal: 0 }, {});
  });

  it('renders component PotProgressDisplayChart with passed props target, oldTotal, difference and isAddition,', (): void => {
    render(
      <PotProgressDisplay
        {...testProps}
        target={target}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={isAddition}
      />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChart).toHaveBeenCalledWith(
      { target, oldTotal, difference, isAddition },
      {}
    );
  });
});
