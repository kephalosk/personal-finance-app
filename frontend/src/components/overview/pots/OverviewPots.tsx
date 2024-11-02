import './OverviewPots.scss';
import { OverviewHeader } from '../OverviewHeader';
import { ValueBox } from '../ValueBox';
import { PotsSummary } from './PotsSummary';
import { getPots } from '../../../globals/services/PotService';
import { EPPot } from '../../../model/entrypoints/EPPot';
import { OverviewPotsProps } from '../../../model/props/OverviewPotsProps';
import PropTypes from 'prop-types';

OverviewPots.propTypes = {
  pots: PropTypes.array.isRequired,
};

export function OverviewPots({ pots }: OverviewPotsProps) {
  let potSum: number = 0;
  pots.forEach((pot) => {
    potSum = potSum + pot.total;
  });
  return (
    <>
      <div className="overviewPots" data-testid="overview-pots">
        <OverviewHeader title="Pots" linkText="See Details" linkTarget="/pots" />
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
      </div>
    </>
  );
}
