import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import PotProgressDisplayChartBar from './PotProgressDisplayChartBar';
import PotProgressDisplayChart from './PotProgressDisplayChart';

jest.mock(
  './PotProgressDisplayChartBar',
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid="pot-progress-display-chart-bar"></div>)
);

describe('PotProgressDisplayChart', (): void => {
  const target: number = 2000;
  const oldTotal: number = 500;
  const difference: number = 100;
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

  it('renders div potProgressDisplayChart', (): void => {
    const { container } = render(<PotProgressDisplayChart {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChart');

    expect(element).toBeInTheDocument();
  });

  it('renders component PotProgressDisplayChartBar with passed props oldTotal, difference and isAddition === true', (): void => {
    render(
      <PotProgressDisplayChart
        {...testProps}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={true}
      />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      {
        isAddition: true,
        widthPercentBase: (oldTotal / target) * 100,
        widthPercentDiff: (difference / target) * 100,
      },
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with passed prop isAddition === false', (): void => {
    render(<PotProgressDisplayChart {...testProps} isAddition={false} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      {
        isAddition: false,
        widthPercentBase: ((oldTotal - difference) / target) * 100,
        widthPercentDiff: (difference / target) * 100,
      },
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with passed prop isAddition === true and oldTotal + differenceAbsolut >= target', (): void => {
    const target: number = 1000;
    const oldTotal: number = 250;
    const difference: number = 1000;
    render(
      <PotProgressDisplayChart
        {...testProps}
        target={target}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={true}
      />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      {
        isAddition: true,
        widthPercentBase: (oldTotal / target) * 100,
        widthPercentDiff: (1 - oldTotal / target) * 100,
      },
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with passed prop isAddition === false and difference >= oldTotal', (): void => {
    const target: number = 2000;
    const oldTotal: number = 250;
    const difference: number = 1000;
    render(
      <PotProgressDisplayChart
        {...testProps}
        target={target}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={false}
      />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      {
        isAddition: false,
        widthPercentBase: 0,
        widthPercentDiff: (oldTotal / target) * 100,
      },
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with negative difference', (): void => {
    const difference: number = -100;
    render(<PotProgressDisplayChart {...testProps} difference={difference} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      expect.objectContaining({
        widthPercentBase: (oldTotal / target) * 100,
        widthPercentDiff: 0,
      }),
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with difference === 0', (): void => {
    const zeroDifference: number = 0;
    render(<PotProgressDisplayChart {...testProps} difference={zeroDifference} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      expect.objectContaining({
        widthPercentDiff: 0,
      }),
      {}
    );
  });

  it('renders component PotProgressDisplayChartBar with oldTotal === 0', (): void => {
    const zeroOldTotal: number = 0;
    render(<PotProgressDisplayChart {...testProps} oldTotal={zeroOldTotal} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBar).toHaveBeenCalledWith(
      expect.objectContaining({
        widthPercentBase: 0,
      }),
      {}
    );
  });

  it('renders div potProgressDisplayChartBarValues', (): void => {
    const { container } = render(<PotProgressDisplayChart {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValues'
    );

    expect(element).toBeInTheDocument();
  });

  it('renders label potProgressDisplayChartBarValuesPercent with passed prop isAddition === true and correct value', (): void => {
    const newTotalPercentFormatted: string = (((oldTotal + difference) / target) * 100).toFixed(2);
    const { container } = render(<PotProgressDisplayChart {...testProps} isAddition={true} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValuesPercent'
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('green');
    expect(element!.innerHTML).toEqual(`${newTotalPercentFormatted}%`);
  });

  it('renders label potProgressDisplayChartBarValuesPercent with passed prop isAddition === true and total >= target', (): void => {
    const target: number = 1000;
    const oldTotal: number = 500;
    const difference: number = 1000;
    const newTotalPercentFormatted: string = (((oldTotal + difference) / target) * 100).toFixed(2);
    const { container } = render(
      <PotProgressDisplayChart
        {...testProps}
        target={target}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={true}
      />
    );

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValuesPercent'
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('green');
    expect(element!.innerHTML).toEqual(`${newTotalPercentFormatted}%`);
  });

  it('renders label potProgressDisplayChartBarValuesPercent with passed prop isAddition === false and correct value', (): void => {
    const newTotalPercentFormatted: string = (((oldTotal - difference) / target) * 100).toFixed(2);
    const { container } = render(<PotProgressDisplayChart {...testProps} isAddition={false} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValuesPercent'
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('red');
    expect(element!.innerHTML).toEqual(`${newTotalPercentFormatted}%`);
  });

  it('renders label potProgressDisplayChartBarValuesPercent with passed prop isAddition === false and total <= 0', (): void => {
    const zeroPercent: string = '0.00%';
    const oldTotal: number = 500;
    const difference: number = 1000;
    const { container } = render(
      <PotProgressDisplayChart
        {...testProps}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={false}
      />
    );

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValuesPercent'
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('red');
    expect(element!.innerHTML).toEqual(zeroPercent);
  });

  it.each([true, false])(
    'renders label potProgressDisplayChartBarValuesPercent with passed props difference === 0 and isAddition === %s',
    (isAddition: boolean): void => {
      const { container } = render(
        <PotProgressDisplayChart {...testProps} difference={0} isAddition={isAddition} />
      );

      const element: HTMLElement | null = container.querySelector(
        '.potProgressDisplayChartBarValuesPercent'
      );

      expect(element).toBeInTheDocument();
      expect(element).not.toHaveClass('green');
      expect(element).not.toHaveClass('red');
    }
  );

  it('renders label potProgressDisplayChartBarValuesTarget with correct text', (): void => {
    const formattedTarget: string = target.toLocaleString('en-US');
    const { container } = render(<PotProgressDisplayChart {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarValuesTarget'
    );

    expect(element).toBeInTheDocument();
    expect(element!.innerHTML).toEqual(`Target of $${formattedTarget}`);
  });
});
