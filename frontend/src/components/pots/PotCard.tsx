import './PotCard.scss';
import { CardHeader } from '../CardHeader';
import { PotCardDetails } from './PotCardDetails';
import { PotCardProps } from '../../types/PotCardProps';
import PropTypes from 'prop-types';

PotCard.propTypes = {
  pot: PropTypes.object.isRequired,
};

export function PotCard({ pot }: PotCardProps) {
  return (
    <>
      <div className="potCard" data-testid="pot-card">
        <CardHeader title="Savings" color="dark-green" />
        <PotCardDetails pot={pot} />
        <div className="potCardButtons">
          <button className="potCardButton">+ Add Money</button>
          <button className="potCardButton">Withdraw</button>
        </div>
      </div>
    </>
  );
}
