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
  return (
    <div className="potProgressDisplayChartBar" data-testid="pot-progress-display-chart-bar">
      <div className="potProgressDisplayChartBarBaseWrapper">
        <PotProgressDisplayChartBarBase widthPercent={widthPercentBase} />
      </div>
      <div
        className="potProgressDisplayChartBarDiffWrapper"
        style={{ left: `${widthPercentBase}%` }}
      >
        <PotProgressDisplayChartBarDiff widthPercent={widthPercentDiff} isAddition={isAddition} />
      </div>
    </div>
  );
};

export default PotProgressDisplayChartBar;
