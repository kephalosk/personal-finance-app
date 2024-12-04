import './PotCard.scss';
import CardHeader from '../CardHeader';
import { PotCardDetails } from './PotCardDetails';
import { PotCardProps } from '../../model/props/PotCardProps';
import PropTypes from 'prop-types';
import LoadingSpinner from '../LoadingSpinner';

PotCard.propTypes = {
  pot: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export function PotCard({ pot, isLoading }: PotCardProps) {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="potCard" data-testid="pot-card">
          <CardHeader title={pot.name} color={pot.color} />
          <PotCardDetails pot={pot} />
          <div className="potCardButtons">
            <button className="potCardButton add">+ Add Money</button>
            <button className="potCardButton withdraw">Withdraw</button>
          </div>
        </div>
      )}
    </>
  );
}
