import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';
import { ColorDisplayNameEnum } from '../../model/enum/ColorDisplayNameEnum';

export function fromColorNameToDisplayName(colorName: string): ColorDisplayNameEnum {
  switch (colorName) {
    case ColorNameEnum.GREEN:
      return ColorDisplayNameEnum.GREEN;
    case ColorNameEnum.YELLOW:
      return ColorDisplayNameEnum.YELLOW;
    case ColorNameEnum.CYAN:
      return ColorDisplayNameEnum.CYAN;
    case ColorNameEnum.NAVY:
      return ColorDisplayNameEnum.NAVY;
    case ColorNameEnum.RED:
      return ColorDisplayNameEnum.RED;
    case ColorNameEnum.PURPLE:
      return ColorDisplayNameEnum.PURPLE;
    case ColorNameEnum.TURQUOISE:
      return ColorDisplayNameEnum.TURQUOISE;
    case ColorNameEnum.BROWN:
      return ColorDisplayNameEnum.BROWN;
    case ColorNameEnum.MAGENTA:
      return ColorDisplayNameEnum.MAGENTA;
    case ColorNameEnum.BLUE:
      return ColorDisplayNameEnum.BLUE;
    case ColorNameEnum.GREY:
      return ColorDisplayNameEnum.GREY;
    case ColorNameEnum.ARMY:
      return ColorDisplayNameEnum.ARMY;
    case ColorNameEnum.PINK:
      return ColorDisplayNameEnum.PINK;
    case ColorNameEnum.GOLD:
      return ColorDisplayNameEnum.GOLD;
    case ColorNameEnum.ORANGE:
      return ColorDisplayNameEnum.ORANGE;
    case ColorNameEnum.SEPIA:
      return ColorDisplayNameEnum.SEPIA;
    case ColorNameEnum.WHITE:
      return ColorDisplayNameEnum.WHITE;
    case ColorNameEnum.BLACK:
      return ColorDisplayNameEnum.BLACK;
    default:
      return ColorDisplayNameEnum.WHITE;
  }
}
