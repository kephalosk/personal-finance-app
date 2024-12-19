import EnsureFirstPossibleItemIsDefined from './EnsureFirstPossibleItemIsDefined';

describe('EnsureFirstPossibleItemIsDefined', () => {
  it('returns firstPossibleItem if defined', () => {
    const firstPossibleItem: string = 'defined';
    const firstMarkedItem: string = 'alternative';

    const result: string = EnsureFirstPossibleItemIsDefined(firstPossibleItem, firstMarkedItem);

    expect(result).toEqual(firstPossibleItem);
    expect(result).not.toEqual(firstMarkedItem);
  });

  it('returns firstMarkedItem if firstPossibleItem is undefined', () => {
    const firstPossibleItem: undefined = undefined;
    const firstMarkedItem: string = 'alternative';

    const result: string = EnsureFirstPossibleItemIsDefined(firstPossibleItem, firstMarkedItem);

    expect(result).not.toEqual(firstPossibleItem);
    expect(result).toEqual(firstMarkedItem);
  });
});
