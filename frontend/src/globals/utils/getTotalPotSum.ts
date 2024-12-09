import { EPPot } from '../../model/entrypoints/EPPot';

const getTotalPotSum = (pots: EPPot[]): number => {
  let potSum: number = 0;
  pots.forEach((pot: EPPot): void => {
    potSum += pot.total;
  });
  return potSum;
};

export default getTotalPotSum;
