import './OverviewPots.scss';
import OverviewHeader from '../OverviewHeader';
import ValueBox from '../ValueBox';
import PotsSummary from './PotsSummary';
import LoadingSpinner from '../../LoadingSpinner';
import { EPPot } from '../../../model/entrypoints/EPPot';
import { ReactNode } from 'react';
import getTotalPotSum from '../../../globals/utils/getTotalPotSum';

interface Props {
  pots: EPPot[];
  isLoading: boolean;
}

const OverviewPots: ({ pots, isLoading }: Props) => ReactNode = ({
  pots,
  isLoading,
}: Props): ReactNode => {
  const potSum = getTotalPotSum(pots);
  return (
    <>
      <div className="overviewPots" data-testid="overview-pots">
        <OverviewHeader title="Pots" linkText="See Details" linkTarget="/pots" />
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="overviewPotsContent">
            <PotsSummary potSum={potSum} />
            <div className="overviewPotsValues">
              <div className="overviewPotsValuesRow">
                {pots[0] && (
                  <ValueBox title={pots[0].name} value={pots[0].total} color={pots[0].color} />
                )}
                {pots[1] && (
                  <ValueBox title={pots[1].name} value={pots[1].total} color={pots[1].color} />
                )}
              </div>
              <div className="overviewPotsValuesRow">
                {pots[2] && (
                  <ValueBox title={pots[2].name} value={pots[2].total} color={pots[2].color} />
                )}
                {pots[3] && (
                  <ValueBox title={pots[3].name} value={pots[3].total} color={pots[3].color} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default OverviewPots;
