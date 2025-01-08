import { render } from '@testing-library/react';
import PotProgressDisplayChartBarBase from './PotProgressDisplayChartBarBase';

describe('PotProgressDisplayChartBarBase', (): void => {
  const widthPercent: number = 100;

  const testProps: {
    widthPercent: number;
  } = {
    widthPercent,
  };

  it('renders div potProgressDisplayChartBarBase with passed prop width', (): void => {
    const { container } = render(
      <PotProgressDisplayChartBarBase {...testProps} widthPercent={widthPercent} />
    );

    const element: HTMLElement | null = container.querySelector('.potProgressDisplayChartBarBase');

    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('style', `width: ${widthPercent}%;`);
  });
});
