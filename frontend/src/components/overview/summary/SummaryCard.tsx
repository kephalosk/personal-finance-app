import './SummaryCard.scss';
import PropTypes from 'prop-types';
import { SummaryCardProps } from '../../../types/SummaryCardProps';

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isInverted: PropTypes.bool,
};

export function SummaryCard({ title, value, isInverted }: SummaryCardProps) {
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
          ${value}
        </label>
      </div>
    </>
  );
}
