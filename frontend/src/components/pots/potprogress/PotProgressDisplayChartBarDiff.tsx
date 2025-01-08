import './PotProgressDisplayChartBarDiff.scss';
import { ReactNode } from 'react';

interface Props {
  widthPercent: number;
  isAddition: boolean;
}

const PotProgressDisplayChartBarDiff: ({ widthPercent, isAddition }: Props) => ReactNode = ({
  widthPercent,
  isAddition,
}: Props): ReactNode => {
  return (
    <div
      className={`potProgressDisplayChartBarDiff ${isAddition ? 'green' : 'red'}`}
      data-testid="pot-progress-display-chart-bar-diff"
      style={{ width: `${widthPercent}%` }}
    ></div>
  );
};

export default PotProgressDisplayChartBarDiff;
