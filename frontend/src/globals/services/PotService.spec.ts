import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { EPPot } from '../../model/entrypoints/EPPot';
import { getPots } from './PotService';

describe('PotService', () => {
  const firstEPPot: EPPot = {
    name: 'Savings',
    target: 2000,
    total: 159,
    color: ColorNameEnum.DARKGREEN,
  };

  it('maps array APIPotDTO to array EPPot correctly', () => {
    const pots = getPots();
    expect(pots.at(0)).toEqual(firstEPPot);
  });
});
