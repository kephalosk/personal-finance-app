import './PotProgressDisplayChartBarBase.scss';
import { ReactNode } from 'react';

interface Props {
  widthPercent: number;
}

const PotProgressDisplayChartBarBase: ({ widthPercent }: Props) => ReactNode = ({
  widthPercent,
}: Props): ReactNode => {
  return (
    <div
      className="potProgressDisplayChartBarBase"
      data-testid="pot-progress-display-chart-bar-base"
      style={{ width: `${widthPercent}%` }}
    ></div>
  );
};

export default PotProgressDisplayChartBarBase;
