import './PotProgressDisplayHeader.scss';
import { ReactNode } from 'react';

interface Props {
  newTotal: number;
}

const PotProgressDisplayHeader: ({ newTotal }: Props) => ReactNode = ({
  newTotal,
}: Props): ReactNode => {
  const fixedAmount: string = newTotal.toFixed(2);
  const value: string = `${fixedAmount}`;

  return (
    <div className="potProgressDisplayHeader" data-testid="pot-progress-display-header">
      <label className="potProgressDisplayHeaderTitle">New Amount</label>
      <label className="potProgressDisplayHeaderValue">{value}</label>
    </div>
  );
};

export default PotProgressDisplayHeader;
