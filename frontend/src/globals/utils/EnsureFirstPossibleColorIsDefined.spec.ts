import EnsureFirstPossibleColorIsDefined from './EnsureFirstPossibleColorIsDefined';
import Colors from '../../constants/Colors';

describe('EnsureFirstPossibleColorIsDefined', () => {
  it('returns firstPossibleColor if defined', () => {
    const firstPossibleColor = Colors[0];
    const firstMarkedColor = Colors[1];

    const result = EnsureFirstPossibleColorIsDefined(firstPossibleColor, firstMarkedColor);

    expect(result).toEqual(firstPossibleColor);
  });

  it('returns firstMarkedColor if firstPossibleColor is undefined', () => {
    const firstMarkedColor = Colors[1];

    const result = EnsureFirstPossibleColorIsDefined(undefined, firstMarkedColor);

    expect(result).toEqual(firstMarkedColor);
  });
});
