import './BudgetCardHeader.scss';
import { BudgetCardHeaderProps } from '../../../types/BudgetCardHeaderProps';
import PropTypes from 'prop-types';
import React from 'react';

BudgetCardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function BudgetCardHeader({ title, color }: BudgetCardHeaderProps) {
  return (
    <>
      <div className="budgetCardHeader" data-testid="budget-card-header">
        <div className={`budgetCardHeaderCircle ${color}`}></div>
        <label className="budgetCardHeaderTitle">{title}</label>
        <img
          className="budgetCardHeaderEditIcon"
          alt="ellipsis icon"
          aria-hidden="true"
          src="./src/assets/images/icon-ellipsis.svg"
        />
      </div>
    </>
  );
}
