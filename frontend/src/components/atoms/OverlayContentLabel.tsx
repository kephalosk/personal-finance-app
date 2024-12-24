import './OverlayContentLabel.scss';

interface Props {
  title: string;
}

const OverlayContentLabel = ({ title }: Props) => {
  return (
    <label className="overlayContentLabel" data-testid="overlay-content-label">
      {title}
    </label>
  );
};

export default OverlayContentLabel;
