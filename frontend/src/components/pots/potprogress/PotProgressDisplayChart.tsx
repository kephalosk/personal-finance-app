import './PotProgressDisplayChart.scss';
import PotProgressDisplayChartBar from './PotProgressDisplayChartBar';
import { ReactNode } from 'react';

interface Props {
  target: number;
  oldTotal: number;
  difference: number;
  isAddition: boolean;
}

const PotProgressDisplayChart: ({
  target,
  oldTotal,
  difference,
  isAddition,
}: Props) => ReactNode = ({ target, oldTotal, difference, isAddition }: Props): ReactNode => {
  const differenceAbsolut: number = Math.abs(difference);

  let widthPercentBase: number = 0;
  const widthTotalBase: number = isAddition ? oldTotal : oldTotal - differenceAbsolut;
  if (widthTotalBase > 0) {
    widthPercentBase = (widthTotalBase / target) * 100;
  }

  let widthPercentDiff: number = 0;
  if (difference > 0) {
    widthPercentDiff = (differenceAbsolut / target) * 100;
  }
  if (isAddition && oldTotal + differenceAbsolut >= target) {
    widthPercentDiff = 100 - widthPercentBase;
  }
  if (!isAddition && difference >= oldTotal) {
    widthPercentDiff = (oldTotal / target) * 100;
  }

  let newTotal: number = isAddition ? oldTotal + difference : oldTotal - difference;
  let newTotalPercent: number = 0;
  if (newTotal > 0) {
    newTotalPercent = (newTotal / target) * 100;
  }
  const newTotalPercentFormatted: string = newTotalPercent.toFixed(2);

  const formattedTarget: string = target.toLocaleString('en-US');

  return (
    <div className="potProgressDisplayChart" data-testid="pot-progress-display-chart">
      <PotProgressDisplayChartBar
        widthPercentBase={widthPercentBase}
        widthPercentDiff={widthPercentDiff}
        isAddition={isAddition}
      />
      <div className="potProgressDisplayChartBarValues">
        <label
          className={`potProgressDisplayChartBarValuesPercent ${isAddition ? 'green' : 'red'}`}
        >{`${newTotalPercentFormatted}%`}</label>
        <label className="potProgressDisplayChartBarValuesTarget">{`Target of $${formattedTarget}`}</label>
      </div>
    </div>
  );
};

export default PotProgressDisplayChart;
