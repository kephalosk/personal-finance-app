import { render, screen } from '@testing-library/react';
import { ReactNode } from 'react';
import PotProgressDisplayChartBarBase from './PotProgressDisplayChartBarBase';
import PotProgressDisplayChartBarDiff from './PotProgressDisplayChartBarDiff';
import PotProgressDisplayChartBar from './PotProgressDisplayChartBar';

jest.mock(
  './PotProgressDisplayChartBarBase',
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid="pot-progress-display-chart-bar-base"></div>)
);
jest.mock(
  './PotProgressDisplayChartBarDiff',
  (): jest.Mock =>
    jest.fn((): ReactNode => <div data-testid="pot-progress-display-chart-bar-diff"></div>)
);

describe('PotProgressDisplayChartBar', (): void => {
  const widthPercentBase: number = 200;
  const widthPercentDiff: number = 100;
  const isAddition: boolean = true;

  const testProps = {
    widthPercentBase,
    widthPercentDiff,
    isAddition,
  };

  it('renders div potProgressDisplayChartBar', (): void => {
    const { container } = render(<PotProgressDisplayChartBar {...testProps} />);

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChartBar');

    expect(element).toBeInTheDocument();
  });

  it('renders div potProgressDisplayChartBarBaseWrapper', (): void => {
    const { container } = render(<PotProgressDisplayChartBar {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarBaseWrapper'
    );

    expect(element).toBeInTheDocument();
  });

  it('renders component PotProgressDisplayChartBarBase with passed prop widthBase', (): void => {
    render(<PotProgressDisplayChartBar {...testProps} widthPercentBase={widthPercentBase} />);

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar-base');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBarBase).toHaveBeenCalledWith(
      { widthPercent: widthPercentBase },
      {}
    );
  });

  it('renders div potProgressDisplayChartBarDiffWrapper', (): void => {
    const { container } = render(<PotProgressDisplayChartBar {...testProps} />);

    const element: HTMLElement | null = container.querySelector(
      '.potProgressDisplayChartBarDiffWrapper'
    );

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('style', `left: ${widthPercentBase}%;`);
  });

  it('renders component PotProgressDisplayChartBarDiff with passed props widthDiff and isAddition', (): void => {
    render(
      <PotProgressDisplayChartBar
        {...testProps}
        widthPercentDiff={widthPercentDiff}
        isAddition={isAddition}
      />
    );

    const component: HTMLElement | null = screen.getByTestId('pot-progress-display-chart-bar-diff');

    expect(component).toBeInTheDocument();
    expect(PotProgressDisplayChartBarDiff).toHaveBeenCalledWith(
      { widthPercent: widthPercentDiff, isAddition },
      {}
    );
  });
});
