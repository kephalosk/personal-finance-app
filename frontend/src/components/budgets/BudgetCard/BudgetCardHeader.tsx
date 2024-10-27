import './BudgetCardHeader.scss';
import { BudgetCardHeaderProps } from '../../../types/BudgetCardHeaderProps';
import PropTypes from 'prop-types';

BudgetCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export function BudgetCardHeader({ title }: BudgetCardHeaderProps) {
  return (
    <>
      <div className="budgetCardHeader" data-testid="budget-card-header">
        <div className="budgetCardHeaderCircle"></div>
        <label className="budgetCardHeaderTitle">{title}</label>
        <select className="budgetCardHeaderEdit">...</select>
      </div>
    </>
  );
}
