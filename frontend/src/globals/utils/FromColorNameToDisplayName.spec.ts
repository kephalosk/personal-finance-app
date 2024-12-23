import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorDisplayNameEnum } from '../../model/enum/ColorDisplayNameEnum';
import { fromColorNameToDisplayName } from './FromColorNameToDisplayName';

describe('fromColorNameToCode', () => {
  it.each([
    [ColorNameEnum.GREEN, ColorDisplayNameEnum.GREEN],
    [ColorNameEnum.YELLOW, ColorDisplayNameEnum.YELLOW],
    [ColorNameEnum.CYAN, ColorDisplayNameEnum.CYAN],
    [ColorNameEnum.NAVY, ColorDisplayNameEnum.NAVY],
    [ColorNameEnum.RED, ColorDisplayNameEnum.RED],
    [ColorNameEnum.PURPLE, ColorDisplayNameEnum.PURPLE],
    [ColorNameEnum.TURQUOISE, ColorDisplayNameEnum.TURQUOISE],
    [ColorNameEnum.BROWN, ColorDisplayNameEnum.BROWN],
    [ColorNameEnum.MAGENTA, ColorDisplayNameEnum.MAGENTA],
    [ColorNameEnum.BLUE, ColorDisplayNameEnum.BLUE],
    [ColorNameEnum.GREY, ColorDisplayNameEnum.GREY],
    [ColorNameEnum.ARMY, ColorDisplayNameEnum.ARMY],
    [ColorNameEnum.PINK, ColorDisplayNameEnum.PINK],
    [ColorNameEnum.GOLD, ColorDisplayNameEnum.GOLD],
    [ColorNameEnum.ORANGE, ColorDisplayNameEnum.ORANGE],
    [ColorNameEnum.SEPIA, ColorDisplayNameEnum.SEPIA],
    [ColorNameEnum.WHITE, ColorDisplayNameEnum.WHITE],
    [ColorNameEnum.BLACK, ColorDisplayNameEnum.BLACK],
    ['unknown', ColorDisplayNameEnum.WHITE],
  ])('maps color name %s to code %s', (name: string, code: ColorDisplayNameEnum) => {
    const mappedColor = fromColorNameToDisplayName(name);
    expect(mappedColor).toEqual(code);
  });
});
