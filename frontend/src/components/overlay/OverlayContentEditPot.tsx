import './OverlayContentAddNewPot.scss';
import InputCustomName, { InputCustomNameRef } from '../atoms/InputCustomName';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';
import OverlayDropdownColor from './OverlayDropdownColor';
import Colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import { ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import getColorObject from '../../globals/utils/getColorObject';
import { EPPot } from '../../model/entrypoints/EPPot';

interface Props {
  pot: EPPot;
  hasValidNameInput: boolean;
  handleNameInputChange: (input: string) => void;
  hasValidTargetInput: boolean;
  handleTargetInputChange: (input: number) => void;
  isHidden: boolean;
  propagateColorChange: (color: Color) => void;
  hasFormToGetAReset: boolean;
}

const OverlayContentEditPot: ({
  pot,
  hasValidNameInput,
  handleNameInputChange,
  hasValidTargetInput,
  handleTargetInputChange,
  isHidden,
  propagateColorChange,
  hasFormToGetAReset,
}: Props) => ReactNode = ({
  pot,
  hasValidNameInput,
  handleNameInputChange,
  hasValidTargetInput,
  handleTargetInputChange,
  isHidden,
  propagateColorChange,
  hasFormToGetAReset,
}: Props): ReactNode => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);
  const inputCustomNameRef: RefObject<InputMoneyRef> = useRef<InputCustomNameRef>(null);

  useEffect((): void => {
    if (isHidden) {
      inputMoneyRef.current?.reset();
      inputCustomNameRef.current?.reset();
    }
  }, [isHidden]);

  const [colorList, setColorList] = useState<Color[]>(Colors);
  const [selectedColorItem, setSelectedColorItem] = useState<Color>(getColorObject(pot.color));
  useEffect((): void => {
    const filteredColors: Color[] = colorList.filter(
      (color: Color): boolean => color.name !== pot.color
    );
    const updatedColors: Color[] = [getColorObject(pot.color), ...filteredColors];
    setColorList(updatedColors);
    setSelectedColorItem(getColorObject(pot.color));
  }, [pot, hasFormToGetAReset]);

  const handleColorChange: (color: Color) => void = (color: Color) => {
    setSelectedColorItem(color);
    propagateColorChange(color);
  };

  return (
    <div className="overlayContentEditPot" data-testid="overlay-content-edit-pot">
      <OverlayContentLabel title="Pot Name" />
      <InputCustomName
        ref={inputCustomNameRef}
        handleInputChange={handleNameInputChange}
        hasValidInput={hasValidNameInput}
        initialValue={pot.name}
      />
      <OverlayContentLabel title="Target" />
      <InputMoney
        ref={inputMoneyRef}
        handleInputChange={handleTargetInputChange}
        hasValidInput={hasValidTargetInput}
        initialValue={pot.target.toString()}
      />
      <OverlayContentLabel title="Theme" />
      <OverlayDropdownColor
        selectedColor={selectedColorItem}
        handleColorChange={handleColorChange}
        colors={colorList}
      />
    </div>
  );
};

export default OverlayContentEditPot;
