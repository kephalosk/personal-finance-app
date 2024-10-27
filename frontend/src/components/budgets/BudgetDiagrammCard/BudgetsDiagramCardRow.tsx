import './BudgetsDiagramCardRow.scss';
import PropTypes from 'prop-types';
import { BudgetsDiagramCardRowProps } from '../../../types/BudgetsDiagramCardRowProps';

BudgetsDiagramCardRow.propTypes = {
  title: PropTypes.string.isRequired,
  currentAmount: PropTypes.string.isRequired,
  maxAmount: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function BudgetsDiagramCardRow({
  title,
  currentAmount,
  maxAmount,
  color,
}: BudgetsDiagramCardRowProps) {
  return (
    <>
      <div className="budgetsDiagramCardRow" data-testid="budgets-diagramm-card-row">
        <div className={`cardRowLeftBorder ${color}`}></div>
        <label className="cardRowTitle">{title}</label>
        <label className="cardRowTitleCurrentAmount">{currentAmount}</label>
        <label className="cardRowTitleMaxAmount">of {maxAmount}</label>
      </div>
    </>
  );
}
