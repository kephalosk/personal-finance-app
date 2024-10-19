import './BudgetsDiagram.scss';

export function BudgetsDiagram() {
  return (
    <>
      <div className="overviewBudgetsDiagram" data-testid="budgets-diagram">
        <label className="overviewBudgetsDiagramSpend">$338</label>
        <label className="overviewBudgetsDiagramTotal">of $975 limit</label>
      </div>
    </>
  );
}
