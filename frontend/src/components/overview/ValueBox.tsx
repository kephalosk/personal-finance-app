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
        <label className="valueBoxTitle">{title}</label>
        <label className="valueBoxValue">${value}</label>
      </div>
    </>
  );
}
