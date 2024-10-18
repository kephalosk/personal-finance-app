import './ValueBox.scss';
import { ValueBoxProps } from '../Types/ValueBoxProps';
import PropTypes from 'prop-types';

ValueBox.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export function ValueBox({ title, value, color }: ValueBoxProps) {
  return (
    <>
      <div className="valueBox">
        <label className="valueBoxTitle">{title}</label>
        <label className="valueBoxValue">${value}</label>
      </div>
    </>
  );
}
