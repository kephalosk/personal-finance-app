import './OverlayContentDeleteBudget.scss';

interface Props {
  handleClick: () => void;
  budgetKey: string;
}

const OverlayContentDeleteBudget = ({ handleClick, budgetKey }: Props) => {
  const buttonText: string = 'Yes, Confirm Deletion';

  return (
    <button
      className={`overlayContentDeleteBudget ${budgetKey}`}
      data-testid="overlay-content-delete-budget"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default OverlayContentDeleteBudget;
