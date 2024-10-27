import { convertSignedDollarStringToNumber } from './ConvertSignedDollarStringToNumber';

describe('convertSignedDollarStringToNumber', () => {
  it('converts positive strings into positive numbers', () => {
    const inputString: string = '+$1000.11';
    const outputNumber: number = 1000.11;

    const result = convertSignedDollarStringToNumber(inputString);

    expect(result).toEqual(outputNumber);
  });

  it('converts negative strings into positive numbers', () => {
    const inputString: string = '-$1000.11';
    const outputNumber: number = -1000.11;

    const result = convertSignedDollarStringToNumber(inputString);

    expect(result).toEqual(outputNumber);
  });
});
