import isDefined from './isDefined';

describe('isDefined', () => {
  it('returns true if an object is defined', () => {
    const result = isDefined('defined');

    expect(result).toBe(true);
  });

  it('returns false if an object is undefined', () => {
    const result = isDefined(undefined);

    expect(result).toBe(false);
  });

  it('returns false if an object is null', () => {
    const result = isDefined(null);

    expect(result).toBe(false);
  });
});
