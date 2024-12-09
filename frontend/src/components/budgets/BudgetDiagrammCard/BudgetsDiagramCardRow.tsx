import './BudgetsDiagramCardRow.scss';
import { ReactNode } from 'react';

interface Props {
  title: string;
  currentAmount: number;
  maxAmount: number;
  color: string;
}

const BudgetsDiagramCardRow: ({ title, currentAmount, maxAmount, color }: Props) => ReactNode = ({
  title,
  currentAmount,
  maxAmount,
  color,
}: Props): ReactNode => {
  const currentAmountFormatted: string = currentAmount.toFixed(2);
  const maxAmountFormatted: string = maxAmount.toFixed(0);
  return (
    <>
      <div className="budgetsDiagramCardRow" data-testid="budgets-diagramm-card-row">
        <div className={`cardRowLeftBorder ${color}`}></div>
        <label className="cardRowTitle">{title}</label>
        <label className="cardRowTitleCurrentAmount">${currentAmountFormatted}</label>
        <label className="cardRowTitleMaxAmount">of ${maxAmountFormatted}</label>
      </div>
    </>
  );
};

export default BudgetsDiagramCardRow;
