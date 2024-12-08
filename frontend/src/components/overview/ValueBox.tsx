import './ValueBox.scss';

export interface Props {
  title: string;
  value: number;
  color: string;
}

const ValueBox = ({ title, value, color }: Props) => {
  const valueFormatted = value.toFixed(2);
  return (
    <>
      <div className="valueBox" data-testid="value-box">
        <div className={`valueBoxBorder ${color}`}></div>
        <div className="valueBoxContent">
          <label className="valueBoxContentTitle">{title}</label>
          <label className="valueBoxContentValue">${valueFormatted}</label>
        </div>
      </div>
    </>
  );
};

export default ValueBox;
