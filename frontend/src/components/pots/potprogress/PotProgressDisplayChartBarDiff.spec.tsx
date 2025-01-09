import { render } from '@testing-library/react';
import PotProgressDisplayChartBarDiff from './PotProgressDisplayChartBarDiff';

describe('PotProgressDisplayChartBarDiff', (): void => {
  const widthPercent: number = 100;
  const isAddition: boolean = true;

  const testProps: {
    widthPercent: number;
    isAddition: boolean;
  } = {
    widthPercent,
    isAddition,
  };

  it('renders div potProgressDisplayChartBarDiff with passed props width and isAddition === true', (): void => {
    const { container } = render(
      <PotProgressDisplayChartBarDiff
        {...testProps}
        widthPercent={widthPercent}
        isAddition={true}
      />
    );

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChartBarDiff');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('style', `width: ${widthPercent}%;`);
    expect(element).toHaveClass('green');
    expect(element).not.toHaveClass('red');
    expect(element).toHaveClass('showGap');
  });

  it('renders div potProgressDisplayChartBarDiff with passed prop isAddition === false', (): void => {
    const { container } = render(
      <PotProgressDisplayChartBarDiff {...testProps} isAddition={false} />
    );

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChartBarDiff');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('green');
    expect(element).toHaveClass('red');
  });

  it('renders div potProgressDisplayChartBarDiff without gap if passed prop width is 0', (): void => {
    const { container } = render(
      <PotProgressDisplayChartBarDiff {...testProps} widthPercent={0} />
    );

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChartBarDiff');

    expect(element).toBeInTheDocument();
    expect(element).not.toHaveClass('showGap');
  });
});
