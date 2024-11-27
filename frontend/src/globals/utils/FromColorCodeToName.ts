import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';

export function fromColorCodeToName(colorCode: string): ColorNameEnum {
  switch (colorCode) {
    case ColorCodeEnum.GREEN:
      return ColorNameEnum.GREEN;
    case ColorCodeEnum.CYAN:
      return ColorNameEnum.CYAN;
    case ColorCodeEnum.YELLOW:
      return ColorNameEnum.YELLOW;
    case ColorCodeEnum.NAVY:
      return ColorNameEnum.NAVY;
    case ColorCodeEnum.PURPLE:
      return ColorNameEnum.PURPLE;
    default:
      return ColorNameEnum.WHITE;
  }
}
