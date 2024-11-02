import './BudgetsDiagramCardRow.scss';
import PropTypes from 'prop-types';
import { BudgetsDiagramCardRowProps } from '../../../model/props/BudgetsDiagramCardRowProps';

BudgetsDiagramCardRow.propTypes = {
  title: PropTypes.string.isRequired,
  currentAmount: PropTypes.number.isRequired,
  maxAmount: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export function BudgetsDiagramCardRow({
  title,
  currentAmount,
  maxAmount,
  color,
}: BudgetsDiagramCardRowProps) {
  const currentAmountFormatted = currentAmount.toFixed(2);
  const maxAmountFormatted = maxAmount.toFixed(2);
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
}
