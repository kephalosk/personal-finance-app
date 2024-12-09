import './TransactionRow.scss';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';

interface Props {
  name: string;
  value: number;
  date: string;
  imgSrc: string;
}

const TransactionRow = ({ name, value, date, imgSrc }: Props) => {
  const isPositive: boolean = value > 0;
  const color: ColorNameEnum = isPositive ? ColorNameEnum.GREEN : ColorNameEnum.BLACK;
  const sign: string = isPositive ? '+' : '-';

  const valueNeutral: number = isPositive ? value : value * -1;
  const valueNeutralFormatted: string = valueNeutral.toFixed(2);

  return (
    <>
      <div className="overviewTransactionRow" data-testid="transaction-row">
        <img
          className="overviewTransactionRowImage"
          alt="image of payment partner"
          aria-hidden="true"
          src={imgSrc}
        />
        <label className="overviewTransactionRowName">{name}</label>
        <div className="overviewTransactionRowInfo">
          <label className={`overviewTransactionRowInfoValue ${color}`}>
            {sign}${valueNeutralFormatted}
          </label>
          <label className="overviewTransactionRowInfoDate">{date}</label>
        </div>
      </div>
    </>
  );
};

export default TransactionRow;
