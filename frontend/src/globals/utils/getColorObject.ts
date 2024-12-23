import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { Color } from '../../model/Color';
import { fromColorNameToCode } from './FromColorNameToCode';
import { fromColorNameToDisplayName } from './FromColorNameToDisplayName';

export const getColorObject = (color: ColorNameEnum): Color => {
  return {
    name: color,
    code: fromColorNameToCode(color),
    displayName: fromColorNameToDisplayName(color),
    disabled: false,
  };
};
