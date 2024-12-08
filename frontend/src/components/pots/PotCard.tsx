import './PotCard.scss';
import CardHeader from '../CardHeader';
import PotCardDetails from './PotCardDetails';
import LoadingSpinner from '../LoadingSpinner';
import { EPPot } from '../../model/entrypoints/EPPot';

interface Props {
  pot: EPPot;
  isLoading: boolean;
}

const PotCard = ({ pot, isLoading }: Props) => {
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
};

export default PotCard;
