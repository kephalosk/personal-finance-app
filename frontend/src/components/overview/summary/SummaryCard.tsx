import './SummaryCard.scss';
import PropTypes from 'prop-types';
import { SummaryCardProps } from '../../../model/props/SummaryCardProps';
import LoadingSpinner from '../../LoadingSpinner';

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isInverted: PropTypes.bool,
};

export function SummaryCard({ title, value, isLoading, isInverted }: SummaryCardProps) {
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
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <label className={`overviewSummaryCardValue ${isInverted ? 'inverted' : ''}`}>
            ${valueFormatted}
          </label>
        )}
      </div>
    </>
  );
}
