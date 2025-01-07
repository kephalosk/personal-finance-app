import './OverlayContentDeletePot.scss';

interface Props {
  handleClick: () => void;
}

const OverlayContentDeletePot = ({ handleClick }: Props) => {
  const buttonText: string = 'Yes, Confirm Deletion';

  return (
    <button
      className="overlayContentDeletePot"
      data-testid="overlay-content-delete-budget"
      onClick={handleClick}
    >
      {buttonText}
    </button>
  );
};

export default OverlayContentDeletePot;
