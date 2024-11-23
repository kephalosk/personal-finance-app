import './CardHeader.scss';
import { BudgetCardHeaderProps } from '../model/props/BudgetCardHeaderProps';
import PropTypes from 'prop-types';
import React from 'react';

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function CardHeader({ title, color }: BudgetCardHeaderProps) {
  return (
    <>
      <div className="cardHeader" data-testid="card-header">
        <div className={`cardHeaderCircle ${color}`}></div>
        <label className="cardHeaderTitle">{title}</label>
        <img
          className="cardHeaderEditIcon"
          alt="ellipsis icon"
          aria-hidden="true"
          src="/images/icon-ellipsis.svg"
          tabIndex={0}
        />
      </div>
    </>
  );
}
