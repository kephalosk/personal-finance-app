const EnsureFirstPossibleItemIsDefined = <T>(
  firstPossibleItem: T | undefined,
  firstMarkedItem: T
): T => {
  return firstPossibleItem ?? firstMarkedItem;
};

export default EnsureFirstPossibleItemIsDefined;
