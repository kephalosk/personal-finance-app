import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { EPPot } from '../../model/entrypoints/EPPot';
import { getPots } from './PotService';
import axios from 'axios';
import { mockedPotsDTO } from '../../fixtures/MockedPotsDTO';
import { mockedPots2 } from '../../fixtures/MockedPots';

jest.mock('axios');

describe('PotService', () => {
  const firstEPPot: EPPot = {
    name: 'Savings',
    target: 2000,
    total: 159,
    color: ColorNameEnum.DARKGREEN,
  };

  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedPotsDTO });
  });

  it('maps array APIPotDTO to array EPPot correctly', async () => {
    const pots = await getPots();
    expect(pots).toEqual(mockedPots2);
  });

  it('returns fallback values if fetching pots fails', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const pots = await getPots();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to fetch Pots:'));
    expect(pots).toHaveLength(5);
    expect(pots.at(0)).toEqual(firstEPPot);
  });
});
