import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';
import { fromColorCodeToName } from './FromColorCodeToName';

describe('fromColorCodeToName', () => {
  it.each([
    [ColorCodeEnum.GREEN, ColorNameEnum.GREEN],
    [ColorCodeEnum.YELLOW, ColorNameEnum.YELLOW],
    [ColorCodeEnum.CYAN, ColorNameEnum.CYAN],
    [ColorCodeEnum.NAVY, ColorNameEnum.NAVY],
    [ColorCodeEnum.RED, ColorNameEnum.RED],
    [ColorCodeEnum.PURPLE, ColorNameEnum.PURPLE],
    [ColorCodeEnum.TURQUOISE, ColorNameEnum.TURQUOISE],
    [ColorCodeEnum.BROWN, ColorNameEnum.BROWN],
    [ColorCodeEnum.MAGENTA, ColorNameEnum.MAGENTA],
    [ColorCodeEnum.BLUE, ColorNameEnum.BLUE],
    [ColorCodeEnum.GREY, ColorNameEnum.GREY],
    [ColorCodeEnum.ARMY, ColorNameEnum.ARMY],
    [ColorCodeEnum.PINK, ColorNameEnum.PINK],
    [ColorCodeEnum.GOLD, ColorNameEnum.GOLD],
    [ColorCodeEnum.ORANGE, ColorNameEnum.ORANGE],
    [ColorCodeEnum.SEPIA, ColorNameEnum.SEPIA],
    [ColorCodeEnum.WHITE, ColorNameEnum.WHITE],
    [ColorCodeEnum.BLACK, ColorNameEnum.BLACK],
    ['unknown', ColorNameEnum.WHITE],
  ])('maps color code %s to name %s', (code: string, name: ColorNameEnum) => {
    const mappedColor = fromColorCodeToName(code);
    expect(mappedColor).toEqual(name);
  });
});
