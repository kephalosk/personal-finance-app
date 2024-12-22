import './BudgetCard.scss';
import CardHeader from '../../CardHeader';
import ValueBox from '../../overview/ValueBox';
import BudgetCardList from './BudgetCardList';
import React, { ReactNode } from 'react';
import { EPTransaction } from '../../../model/entrypoints/EPTransaction';
import { ColorNameEnum } from '../../../model/enum/ColorNameEnum';
import useIsSmallScreen from '../../../globals/hooks/useIsSmallScreen';
import LoadingSpinner from '../../LoadingSpinner';
import { EPBudget } from '../../../model/entrypoints/EPBudget';
import { CardHeaderItemNameEnum } from '../../../model/enum/CardHeaderItemNameEnum';

interface Props {
  budget: EPBudget;
  transactions: EPTransaction[];
  isLoading: boolean;
}

const BudgetCard: ({ budget, transactions, isLoading }: Props) => ReactNode = ({
  budget,
  transactions,
  isLoading,
}: Props): ReactNode => {
  const budgetTransactions: EPTransaction[] = transactions.filter((transaction: EPTransaction) => {
    return transaction.categoryKey === budget.categoryKey;
  });

  const link: string = `../transactions?cat=${budget.categoryKey}`;

  let spent: number = 0;
  budgetTransactions.forEach((transaction: EPTransaction): void => {
    const amountToAdd: number = transaction.amount < 0 ? transaction.amount : 0;
    spent = spent + amountToAdd;
  });
  spent = spent * -1;

  const remaining: number = budget.maximum - spent;
  const remainingPositive: number = remaining > 0 ? remaining : 0;

  const spentPercent: number = (spent / budget.maximum) * 100;

  const maximumFormatted: string = budget.maximum.toFixed(2);

  const isSmallScreen: boolean = useIsSmallScreen();

  const handleSelection = () => {};

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="budgetCard" data-testid="budget-card">
          <CardHeader
            title={budget.category}
            color={budget.color}
            itemName={CardHeaderItemNameEnum.BUDGET}
            handleSelection={handleSelection}
          />
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
              <ValueBox
                title={`${isSmallScreen ? 'Free' : 'Remaining'}`}
                value={remainingPositive}
                color={ColorNameEnum.SEPIA}
              />
            </div>
          </div>
          <BudgetCardList transactions={budgetTransactions} link={link} />
        </div>
      )}
    </>
  );
};

export default BudgetCard;
