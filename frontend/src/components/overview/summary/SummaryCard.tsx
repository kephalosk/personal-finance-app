import './SummaryCard.scss';
import PropTypes from 'prop-types';
import { SummaryCardProps } from '../../../types/SummaryCardProps';

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isInverted: PropTypes.bool,
};

export function SummaryCard({ title, value, isInverted }: SummaryCardProps) {
  const valueFormatted = value.toFixed(2);
  return (
    <>
      <div
        className={`overviewSummaryCard ${isInverted ? 'inverted' : ''}`}
        data-testid="summary-card"
      >
        <label className={`overviewSummaryCardTitle ${isInverted ? 'inverted' : ''}`}>
          {title}
        </label>
        <label className={`overviewSummaryCardValue ${isInverted ? 'inverted' : ''}`}>
          ${valueFormatted}
        </label>
      </div>
    </>
  );
}
