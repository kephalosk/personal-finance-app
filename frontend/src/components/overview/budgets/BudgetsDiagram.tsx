import './BudgetsDiagram.scss';
import React from 'react';

export function BudgetsDiagram() {
  const angles: number[] = [18, 295, 324];
  return (
    <>
      <div className="overviewBudgetsDiagram" data-testid="budgets-diagram">
        <div
          className="overviewBudgetsDiagramCircleBig"
          style={
            {
              '--angle1': `${angles[0]}deg`,
              '--angle2': `${angles[1]}deg`,
              '--angle3': `${angles[2]}deg`,
            } as React.CSSProperties & { [key: string]: string }
          }
        >
          <div className="overviewBudgetsDiagramCircleSmall">
            <label className="overviewBudgetsDiagramSpend">$338</label>
            <label className="overviewBudgetsDiagramTotal">of $975 limit</label>
          </div>
        </div>
      </div>
    </>
  );
}
