import './BudgetsDiagram.scss';
import React from 'react';
import { BudgetsDiagramProps } from '../../types/BudgetsDiagramProps';
import { EPBudget } from '../../types/EPBudget';
import { EPTransaction } from '../../types/EPTransaction';

export function BudgetsDiagram({ budgets, transactions }: BudgetsDiagramProps) {
  let spentTotal = 0;
  budgets.forEach((budget) => {
    transactions.forEach((transaction) => {
      if (budget.categoryKey === transaction.categoryKey) {
        spentTotal = spentTotal + transaction.amount;
      }
    });
  });
  spentTotal = spentTotal * -1;
  const spentTotalFormatted = spentTotal.toFixed(0);

  let budgetTotal = 0;
  budgets.forEach((budget) => {
    budgetTotal = budgetTotal + budget.maximum;
  });

  const fullCircle: number = 360;
  const angles: number[] = [];
  let currentAngle: number = 0;
  let colors: string[] = [];
  let colorsLightened: string[] = [];
  budgets.forEach((budget: EPBudget, index: number) => {
    if (index < budgets.length - 1) {
      let budgetSpent = 0;
      transactions.forEach((transaction: EPTransaction) => {
        if (transaction.categoryKey === budget.categoryKey) {
          budgetSpent = budgetSpent + transaction.amount;
        }
      });
      const budgetSpentPositive = budgetSpent * -1;
      const budgetPercent = budgetSpentPositive / spentTotal;
      const budgetAngle = budgetPercent * fullCircle;
      currentAngle = currentAngle + budgetAngle;
      angles.push(currentAngle);
    }
    colors.push(`var(--${budget.color})`);
    colorsLightened.push(`var(--${budget.color}-lightened)`);
  });

  const generateConicGradientBig = () => {
    let gradientString = 'conic-gradient(';
    gradientString += colors
      .map((color, index) => {
        const startAngle = index === 0 ? 0 : angles[index - 1];
        const endAngle = angles[index] || fullCircle; // Letzter Wert auf 360 setzen
        return `${color} ${startAngle}deg ${endAngle}deg`;
      })
      .join(', ');
    gradientString += ')';
    return gradientString;
  };

  const generateConicGradientSmall = () => {
    let gradientString = 'conic-gradient(';
    gradientString += colorsLightened
      .map((color, index) => {
        const startAngle = index === 0 ? 0 : angles[index - 1];
        const endAngle = angles[index] || fullCircle; // Letzter Wert auf 360 setzen
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
}
