import './BudgetsDiagram.scss';
import React, { ReactNode } from 'react';
import { EPBudget } from '../../model/entrypoints/EPBudget';
import { EPTransaction } from '../../model/entrypoints/EPTransaction';

interface Props {
  budgets: EPBudget[];
  transactions: EPTransaction[];
}

const BudgetsDiagram: ({ budgets, transactions }: Props) => ReactNode = ({
  budgets,
  transactions,
}: Props): ReactNode => {
  let spentTotal: number = 0;
  budgets.forEach((budget: EPBudget): void => {
    transactions.forEach((transaction: EPTransaction): void => {
      if (budget.categoryKey === transaction.categoryKey) {
        spentTotal = spentTotal + transaction.amount;
      }
    });
  });
  spentTotal = spentTotal * -1;
  const spentTotalFormatted: string = spentTotal.toFixed(0);

  let budgetTotal: number = 0;
  budgets.forEach((budget: EPBudget): void => {
    budgetTotal = budgetTotal + budget.maximum;
  });

  const fullCircle: number = 360;
  const angles: number[] = [];
  let currentAngle: number = 0;
  let colors: string[] = [];
  let colorsLightened: string[] = [];
  budgets.forEach((budget: EPBudget, index: number): void => {
    if (index < budgets.length - 1) {
      let budgetSpent: number = 0;
      transactions.forEach((transaction: EPTransaction): void => {
        if (transaction.categoryKey === budget.categoryKey) {
          budgetSpent = budgetSpent + transaction.amount;
        }
      });
      const budgetSpentPositive: number = budgetSpent * -1;
      const budgetPercent: number = budgetSpentPositive / spentTotal;
      const budgetAngle: number = budgetPercent * fullCircle;
      currentAngle = currentAngle + budgetAngle;
      angles.push(currentAngle);
    }
    colors.push(`var(--${budget.color})`);
    colorsLightened.push(`var(--${budget.color}-lightened)`);
  });

  const generateConicGradientBig: () => string = (): string => {
    let gradientString: string = 'conic-gradient(';
    gradientString += colors
      .map((color: string, index: number): string => {
        const startAngle: number = index === 0 ? 0 : angles[index - 1];
        const endAngle: number = angles[index] || fullCircle;
        return `${color} ${startAngle}deg ${endAngle}deg`;
      })
      .join(', ');
    gradientString += ')';
    return gradientString;
  };

  const generateConicGradientSmall: () => string = (): string => {
    let gradientString: string = 'conic-gradient(';
    gradientString += colorsLightened
      .map((color: string, index: number) => {
        const startAngle: number = index === 0 ? 0 : angles[index - 1];
        const endAngle: number = angles[index] || fullCircle;
        return `${color} ${startAngle}deg ${endAngle}deg`;
      })
      .join(', ');
    gradientString += ')';
    return gradientString;
  };

  return (
    <>
      <div className="overviewBudgetsDiagram" data-testid="budgets-diagram">
        <div
          className="overviewBudgetsDiagramCircleBig"
          style={{
            background: generateConicGradientBig(),
          }}
        >
          <div
            className="overviewBudgetsDiagramCircleSmall"
            style={{
              background: generateConicGradientSmall(),
            }}
          >
            <label className="overviewBudgetsDiagramSpend">${spentTotalFormatted}</label>
            <label className="overviewBudgetsDiagramTotal">of ${budgetTotal} limit</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default BudgetsDiagram;
