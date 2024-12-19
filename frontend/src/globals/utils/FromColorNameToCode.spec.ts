import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';
import { fromColorNameToCode } from './FromColorNameToCode';

describe('fromColorNameToCode', () => {
  it.each([
    [ColorNameEnum.GREEN, ColorCodeEnum.GREEN],
    [ColorNameEnum.YELLOW, ColorCodeEnum.YELLOW],
    [ColorNameEnum.CYAN, ColorCodeEnum.CYAN],
    [ColorNameEnum.NAVY, ColorCodeEnum.NAVY],
    [ColorNameEnum.RED, ColorCodeEnum.RED],
    [ColorNameEnum.PURPLE, ColorCodeEnum.PURPLE],
    [ColorNameEnum.TURQUOISE, ColorCodeEnum.TURQUOISE],
    [ColorNameEnum.BROWN, ColorCodeEnum.BROWN],
    [ColorNameEnum.MAGENTA, ColorCodeEnum.MAGENTA],
    [ColorNameEnum.BLUE, ColorCodeEnum.BLUE],
    [ColorNameEnum.GREY, ColorCodeEnum.GREY],
    [ColorNameEnum.ARMY, ColorCodeEnum.ARMY],
    [ColorNameEnum.PINK, ColorCodeEnum.PINK],
    [ColorNameEnum.GOLD, ColorCodeEnum.GOLD],
    [ColorNameEnum.ORANGE, ColorCodeEnum.ORANGE],
    [ColorNameEnum.SEPIA, ColorCodeEnum.SEPIA],
    [ColorNameEnum.WHITE, ColorCodeEnum.WHITE],
    [ColorNameEnum.BLACK, ColorCodeEnum.BLACK],
    ['unknown', ColorCodeEnum.WHITE],
  ])('maps color name %s to code %s', (name: string, code: ColorCodeEnum) => {
    const mappedColor = fromColorNameToCode(name);
    expect(mappedColor).toEqual(code);
  });
});
