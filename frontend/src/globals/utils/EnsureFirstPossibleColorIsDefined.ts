import { Color } from '../../model/Color';

const EnsureFirstPossibleColorIsDefined = (
  firstPossibleColor: Color | undefined,
  firstMarkedColor: Color
): Color => {
  return firstPossibleColor ?? firstMarkedColor;
};

export default EnsureFirstPossibleColorIsDefined;
