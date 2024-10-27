export function convertSignedDollarStringToNumber(value: string): number {
  const neutralValue = parseFloat(value.substring(2, value.length));
  const sign = value.substring(0, 1);
  return sign === '+' ? neutralValue : neutralValue * -1;
}
