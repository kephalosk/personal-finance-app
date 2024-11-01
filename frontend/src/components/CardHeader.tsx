import './CardHeader.scss';
import { BudgetCardHeaderProps } from '../types/BudgetCardHeaderProps';
import PropTypes from 'prop-types';
import React from 'react';

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function CardHeader({ title, color }: BudgetCardHeaderProps) {
  return (
    <>
      <div className="CardHeader" data-testid="card-header">
        <div className={`CardHeaderCircle ${color}`}></div>
        <label className="CardHeaderTitle">{title}</label>
        <img
          className="CardHeaderEditIcon"
          alt="ellipsis icon"
          aria-hidden="true"
          src="./src/assets/images/icon-ellipsis.svg"
        />
      </div>
    </>
  );
}
