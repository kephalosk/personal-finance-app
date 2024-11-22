import './PotPageGrid.scss';
import { EPPot } from '../../model/entrypoints/EPPot';
import { PotCard } from './PotCard';
import LoadingSpinner from '../LoadingSpinner';

interface Props {
  pots: EPPot[];
  isLoading: boolean;
}

function PotPageGrid({ pots, isLoading }: Props) {
  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="potPageGrid" data-testid="pot-page-grid">
          {pots.map((pot: EPPot, index: number) => (
            <PotCard key={index} pot={pot} isLoading={isLoading} />
          ))}
        </div>
      )}
    </>
  );
}

export default PotPageGrid;
