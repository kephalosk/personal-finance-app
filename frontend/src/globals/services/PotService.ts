import data from '../data.json';
import { fromColorCodeToName } from '../utils/FromColorCodeToName';
import { APIPotDTO } from '../../model/api/APIPotDTO';
import { EPPot } from '../../model/entrypoints/EPPot';
import axios, { AxiosResponse } from 'axios';
import { AppConfig } from '../../config';
import { fromColorNameToCode } from '../utils/FromColorNameToCode';
import getErrorMessage from '../utils/getErrorMessage';
import { EPEditedPot } from '../../model/entrypoints/EPEditedPot';
import { APIEditedPotDTO } from '../../model/api/APIEditedPotDTO';
import { APIPotNameDTO } from '../../model/api/APIPotNameDTO';
import { APIPotTotalDTO } from '../../model/api/APIPotTotalDTO';

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

export async function editPot(editedPot: EPEditedPot): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/pots/editPot`;

  try {
    const newPotDTO: APIEditedPotDTO = fromEPEditedPotMapper(editedPot);

    await axios.put<APIEditedPotDTO>(apiUrl, newPotDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Unable to edit Pot: ${error}; ${getErrorMessage(error)}`);
  }
}

export async function deletePot(pot: EPPot): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/pots/deletePot`;

  try {
    const potNameDTO: APIPotNameDTO = { potName: pot.name };
    await axios.delete<string>(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: potNameDTO,
    });
  } catch (error) {
    console.error(`Unable to delete Pot: ${error}; ${getErrorMessage(error)}`);
  }
}

function fromEPEditedPotMapper(editedPot: EPEditedPot): APIEditedPotDTO {
  return {
    ...fromEPPotMapper(editedPot),
    oldName: editedPot.oldName,
  };
}

function fromEPPotMapper(pot: EPPot | EPEditedPot): APIPotDTO {
  return {
    name: pot.name,
    target: pot.target,
    total: pot.total,
    theme: fromColorNameToCode(pot.color),
  };
}

export async function updatePotTotal(updatedPot: EPPot): Promise<void> {
  const apiUrl: string = `${AppConfig.API_BACKEND_HOST}/pots/updatePotTotal`;

  try {
    const newPotTotalDTO: APIPotTotalDTO = toAPIPotTotalMapper(updatedPot);

    await axios.put<APIPotTotalDTO>(apiUrl, newPotTotalDTO, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error(`Unable to update Pot: ${error}; ${getErrorMessage(error)}`);
  }
}

function toAPIPotTotalMapper(pot: EPPot): APIPotTotalDTO {
  return {
    potName: pot.name,
    newTotal: pot.total,
  };
}
