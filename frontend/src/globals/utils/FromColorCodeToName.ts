import { ColorNameEnum } from '../../types/ColorNameEnum';
import { ColorCodeEnum } from '../../types/ColorCodeEnum';

export function fromColorCodeToName(colorCode: string): ColorNameEnum {
  switch (colorCode) {
    case ColorCodeEnum.DARKGREEN:
      return ColorNameEnum.DARKGREEN;
    case ColorCodeEnum.LIGHTBLUE:
      return ColorNameEnum.LIGHTBLUE;
    case ColorCodeEnum.BEIGE:
      return ColorNameEnum.BEIGE;
    case ColorCodeEnum.DARKGREY:
      return ColorNameEnum.DARKGREY;
    case ColorCodeEnum.PURPLE:
      return ColorNameEnum.PURPLE;
    default:
      return ColorNameEnum.WHITE;
  }
}
