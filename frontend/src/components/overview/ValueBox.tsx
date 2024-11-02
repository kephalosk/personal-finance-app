import './ValueBox.scss';
import { ValueBoxProps } from '../../model/props/ValueBoxProps';
import PropTypes from 'prop-types';

ValueBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

export function ValueBox({ title, value, color }: ValueBoxProps) {
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
}
