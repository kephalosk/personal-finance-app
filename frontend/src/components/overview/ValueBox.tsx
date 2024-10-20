import './ValueBox.scss';
import { ValueBoxProps } from '../../types/ValueBoxProps';
import PropTypes from 'prop-types';

ValueBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function ValueBox({ title, value, color }: ValueBoxProps) {
  return (
    <>
      <div className="valueBox" data-testid="value-box">
        <div className={`valueBoxBorder ${color}`}></div>
        <div className="valueBoxContent">
          <label className="valueBoxContentTitle">{title}</label>
          <label className="valueBoxContentValue">${value}</label>
        </div>
      </div>
    </>
  );
}
