import './OverlayContentAddNewPot.scss';
import InputCustomName, { InputCustomNameRef } from '../atoms/InputCustomName';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import InputMoney, { InputMoneyRef } from '../atoms/InputMoney';
import OverlayDropdownColor from './OverlayDropdownColor';
import Colors from '../../constants/Colors';
import { Color } from '../../model/Color';
import { RefObject, useEffect, useRef } from 'react';

interface Props {
  hasValidNameInput: boolean;
  handleNameInputChange: (input: string) => void;
  hasValidTargetInput: boolean;
  handleTargetInputChange: (input: number) => void;
  isHidden: boolean;
  selectedColorItem: Color;
  handleColorChange: (color: Color) => void;
}

const OverlayContentEditPot = ({
  hasValidNameInput,
  handleNameInputChange,
  hasValidTargetInput,
  handleTargetInputChange,
  isHidden,
  selectedColorItem,
  handleColorChange,
}: Props) => {
  const inputMoneyRef: RefObject<InputMoneyRef> = useRef<InputMoneyRef>(null);
  const inputCustomNameRef: RefObject<InputMoneyRef> = useRef<InputCustomNameRef>(null);

  useEffect((): void => {
    if (isHidden) {
      inputMoneyRef.current?.reset();
      inputCustomNameRef.current?.reset();
    }
  }, [isHidden]);

  return (
    <div className="overlayContentAddNewPot" data-testid="overlay-content-add-new-pot">
      <OverlayContentLabel title="Pot Name" />
      <InputCustomName
        ref={inputCustomNameRef}
        handleInputChange={handleNameInputChange}
        hasValidInput={hasValidNameInput}
      />
      <OverlayContentLabel title="Target" />
      <InputMoney
        ref={inputMoneyRef}
        handleInputChange={handleTargetInputChange}
        hasValidInput={hasValidTargetInput}
      />
      <OverlayContentLabel title="Theme" />
      <OverlayDropdownColor
        selectedColor={selectedColorItem}
        handleColorChange={handleColorChange}
        colors={Colors}
      />
    </div>
  );
};

export default OverlayContentEditPot;
