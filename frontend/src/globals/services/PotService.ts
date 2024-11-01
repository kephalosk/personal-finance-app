import data from '../data.json';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import { APIPotDTO } from '../../types/APIPotDTO';
import { EPPot } from '../../types/EPPot';

export function getPots(): EPPot[] {
  const { pots } = data;
  return fromAPIPotsDTOMapper(pots);
}

function fromAPIPotsDTOMapper(pots: APIPotDTO[]): EPPot[] {
  const epPots: EPPot[] = [];
  pots.forEach((pot: APIPotDTO) => {
    const newPot: EPPot = {
      name: pot.name,
      target: pot.target,
      total: pot.total,
      color: fromColorCodeToName(pot.theme),
    };
    epPots.push(newPot);
  });
  return epPots;
}