import './BudgetCard.scss';
import { CardHeader } from '../../CardHeader';
import { ValueBox } from '../../overview/ValueBox';
import { BudgetCardList } from './BudgetCardList';
import { BudgetCardProps } from '../../../model/props/BudgetCardProps';
import React from 'react';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import PropTypes from 'prop-types';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';

BudgetCard.propTypes = {
  budget: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
};

export function BudgetCard({ budget, transactions }: BudgetCardProps) {
  const budgetTransactions: EPTransaction[] = transactions.filter((transaction: EPTransaction) => {
    return transaction.categoryKey === budget.categoryKey;
  });

  const link = '../transactions';

  let spent: number = 0;
  budgetTransactions.forEach((transaction: EPTransaction) => {
    spent = spent + transaction.amount;
  });
  spent = spent * -1;

  const remaining: number = budget.maximum - spent;
  const remainingPositive: number = remaining > 0 ? remaining : 0;

  const spentPercent: number = (spent / budget.maximum) * 100;

  const maximumFormatted = budget.maximum.toFixed(2);
  return (
    <>
      <div className="budgetCard" data-testid="budget-card">
        <CardHeader title={budget.category} color={budget.color} />
        <div className="budgetCardBar">
          <label className="budgetCardBarLabel">Maximum of ${maximumFormatted}</label>
          <div className="budgetCardBarMax">
            <div
              className={`budgetCardBarCurrent ${budget.color}`}
              style={
                {
                  '--barCurrentWidthPercent': `${spentPercent}%`,
                } as React.CSSProperties & { [key: string]: string }
              }
            ></div>
          </div>
          <div className="budgetCardBarValues">
            <ValueBox title="Spent" value={spent} color={budget.color} />
            <ValueBox title="Remaining" value={remainingPositive} color={ColorNameEnum.SEPIA} />
          </div>
        </div>
        <BudgetCardList transactions={budgetTransactions} link={link} />
      </div>
    </>
  );
}
