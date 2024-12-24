import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import getColorObject from './getColorObject';
import { fromColorNameToCode } from './FromColorNameToCode';
import { fromColorNameToDisplayName } from './FromColorNameToDisplayName';
import { Color } from '../../model/Color';

describe('getColorObject', () => {
  it('returns a matching Color object to a given colorName', () => {
    const colorName: ColorNameEnum = ColorNameEnum.GOLD;

    const colorObject: Color = getColorObject(colorName);

    expect(colorObject).toEqual({
      name: colorName,
      code: fromColorNameToCode(colorName),
      displayName: fromColorNameToDisplayName(colorName),
      disabled: false,
    });
  });
});
