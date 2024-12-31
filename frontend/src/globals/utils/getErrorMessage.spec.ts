import getErrorMessage from './getErrorMessage';

describe('getErrorMessage', () => {
  it('returns the error message of the passed error', () => {
    const errorMessage: string = 'original error message';

    const result: string = getErrorMessage(new Error(errorMessage));

    expect(result).toEqual(errorMessage);
  });

  it('returns default message passed Error does not have an error message', () => {
    const result: string = getErrorMessage(undefined);

    expect(result).toEqual('No further information available');
  });
});
