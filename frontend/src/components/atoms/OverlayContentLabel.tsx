import './OverlayContentLabel.scss';

interface Props {
  title: string;
}

const OverlayContentLabel = ({ title }: Props) => {
  return <label className="overlayContentLabel">{title}</label>;
};

export default OverlayContentLabel;
