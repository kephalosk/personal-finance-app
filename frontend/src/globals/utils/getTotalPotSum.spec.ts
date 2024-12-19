import { mockedPots } from '../../fixtures/MockedPots';
import getTotalPotSum from './getTotalPotSum';
import { EPPot } from '../../model/entrypoints/EPPot';

describe('getTotalPotSum', () => {
  it('returns sum of all pot totals', () => {
    const testPots = mockedPots;
    let testPotsSum: number = 0;
    testPots.forEach((pot: EPPot): void => {
      testPotsSum += pot.total;
    });

    const result = getTotalPotSum(testPots);

    expect(result).toEqual(testPotsSum);
  });
});
