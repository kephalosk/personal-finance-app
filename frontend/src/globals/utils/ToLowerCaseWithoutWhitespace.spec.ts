import { toLowerCaseWithoutWhitespace } from './ToLowerCaseWithoutWhitespace';

describe('toLowerCaseWithoutWhitespace', () => {
  it('converts to lowercase without whitespaces', () => {
    const inputString: string = 'Test Test Test';
    const expectedString: string = 'testtesttest';

    const result = toLowerCaseWithoutWhitespace(inputString);

    expect(result).toEqual(expectedString);
  });
});
