import './PotProgressDisplayChartBar.scss';
import PotProgressDisplayChartBarBase from './PotProgressDisplayChartBarBase';
import PotProgressDisplayChartBarDiff from './PotProgressDisplayChartBarDiff';
import { ReactNode } from 'react';

interface Props {
  widthPercentBase: number;
  widthPercentDiff: number;
  isAddition: boolean;
}

const PotProgressDisplayChartBar: ({
  widthPercentBase,
  widthPercentDiff,
  isAddition,
}: Props) => ReactNode = ({ widthPercentBase, widthPercentDiff, isAddition }: Props): ReactNode => {
  const hasVisibleDiffBar: boolean = widthPercentDiff > 0;
  const widthPercentBaseMaxed: number =
    widthPercentBase > 0.99 && hasVisibleDiffBar ? widthPercentBase * 0.99 : widthPercentBase;

  return (
    <div className="potProgressDisplayChartBar" data-testid="pot-progress-display-chart-bar">
      <div className="potProgressDisplayChartBarBaseWrapper">
        <PotProgressDisplayChartBarBase
          widthPercent={widthPercentBaseMaxed}
          hasVisibleDiffBar={hasVisibleDiffBar}
        />
      </div>
      <div
        className="potProgressDisplayChartBarDiffWrapper"
        style={{ left: `${widthPercentBaseMaxed}%` }}
      >
        <PotProgressDisplayChartBarDiff widthPercent={widthPercentDiff} isAddition={isAddition} />
      </div>
    </div>
  );
};

export default PotProgressDisplayChartBar;
