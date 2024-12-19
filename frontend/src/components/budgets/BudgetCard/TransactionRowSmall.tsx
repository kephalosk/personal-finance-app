import './TransactionRowSmall.scss';
import { VorzeichenEnum } from '../../../model/enum/VorzeichenEnum';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';
import { ReactNode } from 'react';

interface Props {
  name: string;
  value: number;
  date: string;
}

const TransactionRowSmall: ({ name, value, date }: Props) => ReactNode = ({
  name,
  value,
  date,
}: Props): ReactNode => {
  const isPositive: boolean = value > 0;
  const color: ColorNameEnum = isPositive ? ColorNameEnum.GREEN : ColorNameEnum.BLACK;
  const sign: VorzeichenEnum = isPositive ? VorzeichenEnum.PLUS : VorzeichenEnum.MINUS;

  const valueNeutral: number = isPositive ? value : value * -1;
  const valueNeutralFormatted: string = valueNeutral.toFixed(2);

  return (
    <div className="overviewTransactionRowSmall" data-testid="transaction-row-small">
      <label className="overviewTransactionRowSmallName">{name}</label>
      <div className="overviewTransactionRowSmallInfo">
        <label className={`overviewTransactionRowSmallInfoValue ${color}`}>
          {sign}${valueNeutralFormatted}
        </label>
        <label className="overviewTransactionRowSmallInfoDate">{date}</label>
      </div>
    </div>
  );
};

export default TransactionRowSmall;
