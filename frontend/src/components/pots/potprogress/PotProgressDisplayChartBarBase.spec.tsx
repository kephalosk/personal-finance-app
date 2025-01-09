import { render } from '@testing-library/react';
import PotProgressDisplayChartBarBase from './PotProgressDisplayChartBarBase';

describe('PotProgressDisplayChartBarBase', (): void => {
  const widthPercent: number = 100;
  const hasVisibleDiffBar: boolean = true;

  const testProps: {
    widthPercent: number;
    hasVisibleDiffBar: boolean;
  } = {
    widthPercent,
    hasVisibleDiffBar,
  };

  it.each([
    [true, 'hardRightBorder'],
    [false, 'roundBorder'],
  ])(
    'renders div potProgressDisplayChartBarBase with passed props width and hasVisibleDiffBar === %s',
    (hasVisibleDiffBar: boolean, className: string): void => {
      const { container } = render(
        <PotProgressDisplayChartBarBase
          {...testProps}
          widthPercent={widthPercent}
          hasVisibleDiffBar={hasVisibleDiffBar}
        />
      );

      const element: HTMLElement | null = container.querySelector(
        '.potProgressDisplayChartBarBase'
      );

      expect(element).toBeInTheDocument();
      expect(element).toHaveAttribute('style', `width: ${widthPercent}%;`);
      expect(element).toHaveClass(className);
    }
  );
});
