import './OverlayContentDeleteBudget.scss';

interface Props {
  handleClick: () => void;
}

const OverlayContentDeleteBudget = ({ handleClick }: Props) => {
  const buttonText: string = 'Yes, Confirm Deletion';

  return (
    <button
      className="overlayContentDeleteBudget"
      data-testid="overlay-content-delete-budget"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default OverlayContentDeleteBudget;
