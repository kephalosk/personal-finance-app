import './PotProgressDisplay.scss';
import PotProgressDisplayHeader from './PotProgressDisplayHeader';
import PotProgressDisplayChart from './PotProgressDisplayChart';
import { ReactNode } from 'react';

interface Props {
  target: number;
  oldTotal: number;
  difference: number;
  isAddition: boolean;
}

const PotProgressDisplay: ({ target, oldTotal, difference, isAddition }: Props) => ReactNode = ({
  target,
  oldTotal,
  difference,
  isAddition,
}: Props): ReactNode => {
  let newTotal: number = isAddition ? oldTotal + difference : oldTotal - difference;
  if (newTotal < 0) {
    newTotal = 0;
  }

  return (
    <div className="potProgressDisplay" data-testid="pot-progress-display">
      <PotProgressDisplayHeader newTotal={newTotal} />
      <PotProgressDisplayChart
        target={target}
        oldTotal={oldTotal}
        difference={difference}
        isAddition={isAddition}
      />
    </div>
  );
};

export default PotProgressDisplay;
