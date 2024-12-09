import './SummaryCard.scss';
import LoadingSpinner from '../../LoadingSpinner';
import { ReactNode } from 'react';

interface Props {
  title: string;
  value: number;
  isLoading: boolean;
  isInverted?: boolean;
}

const SummaryCard: ({ title, value, isLoading, isInverted }: Props) => ReactNode = ({
  title,
  value,
  isLoading,
  isInverted,
}: Props): ReactNode => {
  const valueFormatted: string = value.toFixed(2);

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
};

export default SummaryCard;
