import './PotCard.scss';
import CardHeader from '../CardHeader';
import PotCardDetails from './PotCardDetails';
import LoadingSpinner from '../LoadingSpinner';
import { EPPot } from '../../model/entrypoints/EPPot';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import { ReactNode } from 'react';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';

interface Props {
  pot: EPPot;
  isLoading: boolean;
}

const PotCard: ({ pot, isLoading }: Props) => ReactNode = ({
  pot,
  isLoading,
}: Props): ReactNode => {
  const handleSelection = (itemOperation: CardHeaderItemOperationEnum): void => {
    if (itemOperation === CardHeaderItemOperationEnum.EDIT) {
      //TODO fe-27 edit
    }
    if (itemOperation === CardHeaderItemOperationEnum.DELETE) {
      //TODO fe-28 delete
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="potCard" data-testid="pot-card">
          <CardHeader
            title={pot.name}
            color={pot.color}
            itemName={CardHeaderItemNameEnum.POT}
            handleSelection={handleSelection}
          />
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
