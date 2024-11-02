import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';
import { fromColorCodeToName } from './FromColorCodeToName';

describe('BudgetService', () => {
  it.each([
    [ColorCodeEnum.DARKGREEN, ColorNameEnum.DARKGREEN],
    [ColorCodeEnum.LIGHTBLUE, ColorNameEnum.LIGHTBLUE],
    [ColorCodeEnum.BEIGE, ColorNameEnum.BEIGE],
    [ColorCodeEnum.DARKGREY, ColorNameEnum.DARKGREY],
    [ColorCodeEnum.PURPLE, ColorNameEnum.PURPLE],
    [ColorCodeEnum.WHITE, ColorNameEnum.WHITE],
  ])('maps color code %s to %s', (code: ColorCodeEnum, name: ColorNameEnum) => {
    const mappedColor = fromColorCodeToName(code);
    expect(mappedColor).toEqual(name);
  });
});
