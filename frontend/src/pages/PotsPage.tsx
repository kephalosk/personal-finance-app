import './PotsPage.scss';
import HeaderBar from '../components/HeaderBar';
import { EPPot } from '../model/entrypoints/EPPot';
import { addNewPot, getPots } from '../globals/services/PotService';
import React, { useEffect, useState } from 'react';
import PotPageGrid from '../components/pots/PotPageGrid';
import OverlayCardBox from '../components/overlay/OverlayCardBox';
import OverlayContentAddNewPot from '../components/overlay/OverlayContentAddNewPot';
import Colors from '../constants/Colors';
import { Color } from '../model/Color';

const PotsPage: () => React.ReactNode = (): React.ReactNode => {
  const addNewPotDescription: string =
    'Create a pot to set savings targets. These can help keep you on track as you save for special purchases.';

  const [pots, setPots] = useState<EPPot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect((): void => {
    const fetchPots = async (): Promise<void> => {
      await updatePage();
    };
    fetchPots().then();
  }, []);

  const updatePage: () => Promise<void> = async (): Promise<void> => {
    setIsLoading(true);
    const fetchedPots: EPPot[] = await getPots();
    setPots(fetchedPots);
    setIsLoading(false);
  };

  const openNewPotForm = (): void => {
    setIsHidden(false);
  };

  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [hasValidNameInput, setHasValidNameInput] = useState<boolean>(true);
  const [potName, setPotName] = useState<string>('');
  const [hasValidTargetInput, setHasValidTargetInput] = useState<boolean>(true);
  const [potAmount, setPotAmount] = useState<number>(0);
  const [selectedColorItem, setSelectedColorItem] = useState(Colors[0]);
  const closeForm = (): void => {
    setIsHidden(true);
    deselectElement();
    resetPotCreationValues();
  };

  const resetPotCreationValues = (): void => {
    setHasValidNameInput(true);
    setPotName('');
    setHasValidTargetInput(true);
    setPotAmount(0);
    setSelectedColorItem(Colors[0]);
  };

  const deselectElement = (): void => {
    const activeElement: Element | null = document.activeElement;
    if (activeElement instanceof HTMLElement) {
      activeElement.blur();
    }
  };

  const handleAddNewPot = async (): Promise<void> => {
    if (!potName || isPotNameAlreadyTaken()) {
      setHasValidNameInput(false);
      return;
    }
    if (potAmount === 0) {
      setHasValidTargetInput(false);
      return;
    }
    const newPot: EPPot = {
      name: potName,
      target: potAmount,
      total: 0,
      color: selectedColorItem.name,
    };
    await addNewPot(newPot);
    await updatePage();
    closeForm();
  };

  const isPotNameAlreadyTaken = (): boolean => {
    return pots.some((pot: EPPot): boolean => pot.name === potName);
  };

  const handleNameInputChange = (input: string): void => {
    if (!input.length) {
      setHasValidNameInput(false);
    } else {
      setHasValidNameInput(true);
    }
    setPotName(input);
  };

  const handleTargetInputChange = (input: number): void => {
    if (input === 0) {
      setHasValidTargetInput(false);
    } else {
      setHasValidTargetInput(true);
    }
    setPotAmount(input);
  };

  const handleColorChange: (color: Color) => void = (color: Color): void => {
    setSelectedColorItem(color);
  };

  return (
    <>
      <div className="potsPage" data-testid="pots-page">
        <HeaderBar h1Headline="Pots" buttonText="+ Add New Pot" handleClick={openNewPotForm} />
        <PotPageGrid pots={pots} isLoading={isLoading} updatePage={updatePage} />
      </div>
      <OverlayCardBox
        title="Add New Pot"
        description={addNewPotDescription}
        submitText="Add Pot"
        isHidden={isHidden}
        handleEvent={handleAddNewPot}
        onClose={closeForm}
      >
        <OverlayContentAddNewPot
          hasValidNameInput={hasValidNameInput}
          handleNameInputChange={handleNameInputChange}
          hasValidTargetInput={hasValidTargetInput}
          handleTargetInputChange={handleTargetInputChange}
          isHidden={isHidden}
          selectedColorItem={selectedColorItem}
          handleColorChange={handleColorChange}
        />
      </OverlayCardBox>
    </>
  );
};

export default PotsPage;
