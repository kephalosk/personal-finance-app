import getTotalAmount from './getTotalAmount';
import { mockedBills } from '../../fixtures/MockedBills';

describe('getTotalAmount', () => {
  it('returns total amount of an transaction array', () => {
    const result = getTotalAmount(mockedBills);

    expect(result).toEqual(190);
  });
});
