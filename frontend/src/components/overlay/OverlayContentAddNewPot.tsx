import './OverlayContentAddNewPot.scss';
import CustomNameInput, { InputCustomNameRef } from '../atoms/CustomNameInput';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import MoneyInput, { InputMoneyRef } from '../atoms/MoneyInput';
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

const OverlayContentAddNewPot = ({
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
      <CustomNameInput
        ref={inputCustomNameRef}
        handleInputChange={handleNameInputChange}
        hasValidInput={hasValidNameInput}
      />
      <OverlayContentLabel title="Target" />
      <MoneyInput
        ref={inputMoneyRef}
        handleInputChange={handleTargetInputChange}
        hasValidInput={hasValidTargetInput}
        isLimitInput={true}
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

export default OverlayContentAddNewPot;
