import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';

export function fromColorCodeToName(colorCode: string): ColorNameEnum {
  switch (colorCode) {
    case ColorCodeEnum.GREEN:
      return ColorNameEnum.GREEN;
    case ColorCodeEnum.YELLOW:
      return ColorNameEnum.YELLOW;
    case ColorCodeEnum.CYAN:
      return ColorNameEnum.CYAN;
    case ColorCodeEnum.NAVY:
      return ColorNameEnum.NAVY;
    case ColorCodeEnum.RED:
      return ColorNameEnum.RED;
    case ColorCodeEnum.PURPLE:
      return ColorNameEnum.PURPLE;
    case ColorCodeEnum.TURQUOISE:
      return ColorNameEnum.TURQUOISE;
    case ColorCodeEnum.BROWN:
      return ColorNameEnum.BROWN;
    case ColorCodeEnum.MAGENTA:
      return ColorNameEnum.MAGENTA;
    case ColorCodeEnum.BLUE:
      return ColorNameEnum.BLUE;
    case ColorCodeEnum.GREY:
      return ColorNameEnum.GREY;
    case ColorCodeEnum.ARMY:
      return ColorNameEnum.ARMY;
    case ColorCodeEnum.PINK:
      return ColorNameEnum.PINK;
    case ColorCodeEnum.GOLD:
      return ColorNameEnum.GOLD;
    case ColorCodeEnum.ORANGE:
      return ColorNameEnum.ORANGE;
    case ColorCodeEnum.SEPIA:
      return ColorNameEnum.SEPIA;
    case ColorCodeEnum.WHITE:
      return ColorNameEnum.WHITE;
    case ColorCodeEnum.BLACK:
      return ColorNameEnum.BLACK;
    default:
      return ColorNameEnum.WHITE;
  }
}
