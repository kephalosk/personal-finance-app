import './BudgetCard.scss';
import { BudgetCardHeader } from './BudgetCardHeader';
import { ValueBox } from '../../overview/ValueBox';
import { BudgetCardList } from './BudgetCardList';
import { BudgetCardProps } from '../../../types/BudgetCardProps';
import React from 'react';

export function BudgetCard({ transactions, link, maximum, category, color }: BudgetCardProps) {
  let spent: number = 0;
  transactions.forEach((transaction) => {
    spent = spent + transaction.value;
  });
  spent = spent * -1;

  const remaining: number = maximum - spent;

  const spentPercent: number = (spent / maximum) * 100;

  const maximumFormatted = maximum.toFixed(2);
  return (
    <>
      <div className="budgetCard" data-testid="budget-card">
        <BudgetCardHeader title={category} color={color} />
        <div className="budgetCardBar">
          <label className="budgetCardBarLabel">Maximum of ${maximumFormatted}</label>
          <div className="budgetCardBarMax">
            <div
              className={`budgetCardBarCurrent ${color}`}
              style={
                {
                  '--barCurrentWidthPercent': `${spentPercent}%`,
                } as React.CSSProperties & { [key: string]: string }
              }
            ></div>
          </div>
          <div className="budgetCardBarValues">
            <ValueBox title="Spent" value={spent} color={color} />
            <ValueBox title="Remaining" value={remaining} color="sepia" />
          </div>
        </div>
        <BudgetCardList transactions={transactions} link={link} />
      </div>
    </>
  );
}
