import './PotCard.scss';
import CardHeader from '../CardHeader';
import PotCardDetails from './PotCardDetails';
import LoadingSpinner from '../LoadingSpinner';
import { EPPot } from '../../model/entrypoints/EPPot';
import { CardHeaderItemNameEnum } from '../../model/enum/CardHeaderItemNameEnum';
import React, { ReactNode, useState } from 'react';
import { CardHeaderItemOperationEnum } from '../../model/enum/CardHeaderItemOperationEnum';
import OverlayCardBox from '../overlay/OverlayCardBox';
import { EPEditedPot } from '../../model/entrypoints/EPEditedPot';
import getColorObject from '../../globals/utils/getColorObject';
import { Color } from '../../model/Color';
import OverlayContentEditPot from '../overlay/OverlayContentEditPot';

interface Props {
  pots: EPPot[];
  pot: EPPot;
  updatePage: () => Promise<void>;
  isLoading: boolean;
}

const PotCard: ({ pots, pot, updatePage, isLoading }: Props) => ReactNode = ({
  pots,
  pot,
  updatePage,
  isLoading,
}: Props): ReactNode => {
  const editPotDescription: string =
    'If your saving targets change, feel free to update your pots.';

  const [isEditPotHidden, setIsEditPotHidden] = useState<boolean>(true);
  // const [isDeletePotHidden, setIsDeletePotHidden] = useState<boolean>(true);
  const handleSelection = (itemOperation: CardHeaderItemOperationEnum): void => {
    if (itemOperation === CardHeaderItemOperationEnum.EDIT) {
      setIsEditPotHidden(false);
    }
    // if (itemOperation === CardHeaderItemOperationEnum.DELETE) {
    //   setIsDeletePotHidden(false);
    // }
  };

  const [hasValidNameInput, setHasValidNameInput] = useState<boolean>(true);
  const [newPotName, setNewPotName] = useState<string>(pot.name);
  const [hasValidTargetInput, setHasValidTargetInput] = useState<boolean>(true);
  const [potAmount, setPotAmount] = useState<number>(pot.target);
  const initialPotColorObject: Color = getColorObject(pot.color);
  const [selectedColorItem, setSelectedColorItem] = useState(initialPotColorObject);
  const [hasFormToGetAReset, setHasFormToGetAReset] = useState<boolean>(false);
  const closeForm = (): void => {
    setIsEditPotHidden(true);
    // setIsDeletePotHidden(true);
    deselectElement();
    resetPotCreationValues();
  };

  const resetPotCreationValues = (): void => {
    setHasValidNameInput(true);
    setNewPotName(pot.name);
    setHasValidTargetInput(true);
    setPotAmount(pot.target);
    setSelectedColorItem(initialPotColorObject);
    setHasFormToGetAReset(true);
  };

  const deselectElement = (): void => {
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleEditPot: () => Promise<void> = async (): Promise<void> => {
    if (!newPotName || !isPotNameValid) {
      setHasValidNameInput(false);
      return;
    }
    if (potAmount === 0) {
      setHasValidTargetInput(false);
      return;
    }
    setHasValidNameInput(true);
    setHasValidTargetInput(true);

    const editedPot: EPEditedPot = {
      oldName: pot.name,
      name: newPotName,
      target: potAmount,
      total: 0,
      color: selectedColorItem.name,
    };
    // await editPot(editedPot);
    await updatePage();
    closeForm();
  };

  const isPotNameValid: () => boolean = (): boolean => {
    return isPotNameSameAsBefore() || !isPotNameAlreadyTaken();
  };

  const isPotNameSameAsBefore: () => boolean = (): boolean => {
    return newPotName === pot.name;
  };

  const isPotNameAlreadyTaken: () => boolean = (): boolean => {
    return pots.some((pot: EPPot): boolean => pot.name === newPotName);
  };

  const propagateColorChange: (color: Color) => void = (color: Color): void => {
    setSelectedColorItem(color);
    setHasFormToGetAReset(false);
  };

  const handleNameInputChange = (input: string): void => {
    if (!input.length) {
      setHasValidNameInput(false);
    } else {
      setHasValidNameInput(true);
    }
    setNewPotName(input);
  };

  const handleTargetInputChange = (input: number): void => {
    if (input === 0) {
      setHasValidTargetInput(false);
    } else {
      setHasValidTargetInput(true);
    }
    setPotAmount(input);
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
          <OverlayCardBox
            title="Edit Pot"
            description={editPotDescription}
            submitText="Save Changes"
            isHidden={isEditPotHidden}
            handleEvent={handleEditPot}
            onClose={closeForm}
          >
            <OverlayContentEditPot
              pot={pot}
              hasValidNameInput={hasValidNameInput}
              handleNameInputChange={handleNameInputChange}
              hasValidTargetInput={hasValidTargetInput}
              handleTargetInputChange={handleTargetInputChange}
              isHidden={isEditPotHidden}
              propagateColorChange={propagateColorChange}
              hasFormToGetAReset={hasFormToGetAReset}
            />
          </OverlayCardBox>
        </div>
      )}
    </>
  );
};

export default PotCard;
