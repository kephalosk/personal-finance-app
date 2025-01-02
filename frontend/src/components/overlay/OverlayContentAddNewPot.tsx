import './OverlayContentAddNewPot.scss';
import InputCustomName from '../atoms/InputCustomName';
import OverlayContentLabel from '../atoms/OverlayContentLabel';
import InputMoney from '../atoms/InputMoney';
import OverlayDropdownColor from './OverlayDropdownColor';
import colors from '../../constants/Colors';

const OverlayContentAddNewPot = () => {
  return (
    <>
      <OverlayContentLabel title="Pot Name" />
      <InputCustomName handleInputChange={() => {}} hasValidInput={true} />
      <OverlayContentLabel title="Target" />
      <InputMoney handleInputChange={() => {}} hasValidInput={true} />
      <OverlayContentLabel title="Theme" />
      <OverlayDropdownColor
        selectedColor={colors[0]}
        handleColorChange={() => {}}
        colors={colors}
      />
    </>
  );
};

export default OverlayContentAddNewPot;
