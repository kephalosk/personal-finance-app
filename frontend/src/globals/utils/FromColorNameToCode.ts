import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';

export function fromColorNameToCode(colorName: string): ColorCodeEnum {
  switch (colorName) {
    case ColorNameEnum.GREEN:
      return ColorCodeEnum.GREEN;
    case ColorNameEnum.YELLOW:
      return ColorCodeEnum.YELLOW;
    case ColorNameEnum.CYAN:
      return ColorCodeEnum.CYAN;
    case ColorNameEnum.NAVY:
      return ColorCodeEnum.NAVY;
    case ColorNameEnum.RED:
      return ColorCodeEnum.RED;
    case ColorNameEnum.PURPLE:
      return ColorCodeEnum.PURPLE;
    case ColorNameEnum.TURQUOISE:
      return ColorCodeEnum.TURQUOISE;
    case ColorNameEnum.BROWN:
      return ColorCodeEnum.BROWN;
    case ColorNameEnum.MAGENTA:
      return ColorCodeEnum.MAGENTA;
    case ColorNameEnum.BLUE:
      return ColorCodeEnum.BLUE;
    case ColorNameEnum.GREY:
      return ColorCodeEnum.GREY;
    case ColorNameEnum.ARMY:
      return ColorCodeEnum.ARMY;
    case ColorNameEnum.PINK:
      return ColorCodeEnum.PINK;
    case ColorNameEnum.GOLD:
      return ColorCodeEnum.GOLD;
    case ColorNameEnum.ORANGE:
      return ColorCodeEnum.ORANGE;
    case ColorNameEnum.SEPIA:
      return ColorCodeEnum.SEPIA;
    case ColorNameEnum.WHITE:
      return ColorCodeEnum.WHITE;
    case ColorNameEnum.BLACK:
      return ColorCodeEnum.BLACK;
    default:
      return ColorCodeEnum.WHITE;
  }
}
