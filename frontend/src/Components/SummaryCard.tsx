import './SummaryCard.scss';
import PropTypes from 'prop-types';
import { SummaryCardProps } from '../Types/SummaryCardProps';

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isInverted: PropTypes.bool,
};

export function SummaryCard({ title, value, isInverted }: SummaryCardProps) {
  return (
    <>
      <div className="overviewSummaryCard">
        <label className="overviewSummaryCardTitle">{title}</label>
        <label className="overviewSummaryCardValue">${value}</label>
      </div>
    </>
  );
}
