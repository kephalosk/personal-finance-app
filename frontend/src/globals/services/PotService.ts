// import { InternalServerErrorException, ServiceUnavailableException } from '@nestjs/common';
import data from '../data.json';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import { APIPotDTO } from '../../model/api/APIPotDTO';
import { EPPot } from '../../model/entrypoints/EPPot';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';
import { fromColorNameToCode } from '../utils/FromColorNameToCode';
import getErrorMessage from '../utils/getErrorMessage';

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

export async function addNewPot(newPot: EPPot): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/pots/addNewPot`;

  try {
    const newPotDTO: APIPotDTO = fromEPPotMapper(newPot);

    await axios.post<APIPotDTO>(apiUrl, newPotDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Unable to add new Pot: ${error}; ${getErrorMessage(error)}`);
  }
}

function fromEPPotMapper(pot: EPPot): APIPotDTO {
  return {
    name: pot.name,
    target: pot.target,
    total: pot.total,
    theme: fromColorNameToCode(pot.color),
  };
}
