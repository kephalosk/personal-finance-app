import getErrorMessage from './getErrorMessage';

describe('getErrorMessage', (): void => {
  it('returns error message', () => {
    const errorMessage = 'original error message';
    const input: Error = new Error(errorMessage);

    const result: string = getErrorMessage(input);

    expect(result).toEqual(errorMessage);
  });

  it('returns info if error message is not available', () => {
    const result: string = getErrorMessage(undefined);

    expect(result).toEqual('no error message available');
  });
});
