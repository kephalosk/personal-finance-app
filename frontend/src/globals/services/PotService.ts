import data from '../data.json';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import { APIPotDTO } from '../../model/api/APIPotDTO';
import { EPPot } from '../../model/entrypoints/EPPot';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';

export async function getPots(): Promise<EPPot[]> {
  const apiUrl = `${AppConfig.API_BACKEND_HOST}/pots`;

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
      target: Number(pot.target),
      total: Number(pot.total),
      color: fromColorCodeToName(pot.theme),
    };
    epPots.push(newPot);
  });
  return epPots;
}
