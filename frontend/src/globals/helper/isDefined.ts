const isDefined: <T>(object: T | undefined | null) => boolean = <T>(
  object: T | undefined | null
): boolean => {
  return !!object;
};

export default isDefined;
