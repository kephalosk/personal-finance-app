import data from '../data.json';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import { APIPotDTO } from '../../model/api/APIPotDTO';
import { EPPot } from '../../model/entrypoints/EPPot';
import axios, { AxiosResponse } from 'axios';

export async function getPots(): Promise<EPPot[]> {
  const apiUrl = 'http://localhost:3000/pots';

  try {
    const response: AxiosResponse<APIPotDTO[]> = await axios.get<APIPotDTO[]>(apiUrl);

    const fetchedPots: APIPotDTO[] = response.data;

    return fromAPIPotsDTOMapper(fetchedPots);
  } catch (error) {
    console.error(`Unable to fetch Pots: ${error}`);
    const { pots } = data;
    return fromAPIPotsDTOMapper(pots);
  }
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
