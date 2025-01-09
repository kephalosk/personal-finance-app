import './PotProgressDisplayChartBarBase.scss';
import { ReactNode } from 'react';

interface Props {
  widthPercent: number;
  hasVisibleDiffBar: boolean;
}

const PotProgressDisplayChartBarBase: ({ widthPercent, hasVisibleDiffBar }: Props) => ReactNode = ({
  widthPercent,
  hasVisibleDiffBar,
}: Props): ReactNode => {
  return (
    <div
      className={`potProgressDisplayChartBarBase ${hasVisibleDiffBar ? 'hardRightBorder' : 'roundBorder'}`}
      data-testid="pot-progress-display-chart-bar-base"
      style={{ width: `${widthPercent}%` }}
    ></div>
  );
};

export default PotProgressDisplayChartBarBase;
