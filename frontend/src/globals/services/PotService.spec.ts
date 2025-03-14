import { ColorNameEnum } from '../../model/enum/ColorNameEnum';
import { EPPot } from '../../model/entrypoints/EPPot';
import { addNewPot, deletePot, editPot, getPots, updatePotTotal } from './PotService';
import axios from 'axios';
import { mockedPotsDTO } from '../../fixtures/MockedPotsDTO';
import { mockedPots2 } from '../../fixtures/MockedPots';
import { ColorCodeEnum } from '../../model/enum/ColorCodeEnum';
import { APIPotDTO } from '../../model/api/APIPotDTO';
import { EPEditedPot } from '../../model/entrypoints/EPEditedPot';
import { APIEditedPotDTO } from '../../model/api/APIEditedPotDTO';
import { APIPotTotalDTO } from '../../model/api/APIPotTotalDTO';

jest.mock('axios');

describe('PotService', (): void => {
  const firstEPPot: EPPot = {
    name: 'Savings',
    target: 2000,
    total: 159,
    color: ColorNameEnum.GREEN,
  };
  const mappedFirstEPPot: APIPotDTO = {
    name: 'Savings',
    target: 2000,
    total: 159,
    theme: ColorCodeEnum.GREEN,
  };
  const firstEPeditedPot: EPEditedPot = {
    oldName: 'Savings',
    name: 'Savings',
    target: 2000,
    total: 159,
    color: ColorNameEnum.GREEN,
  };
  const mappedFirstEPeditedPot: APIEditedPotDTO = {
    oldName: 'Savings',
    name: 'Savings',
    target: 2000,
    total: 159,
    theme: ColorCodeEnum.GREEN,
  };

  const newPotTotalDTO: APIPotTotalDTO = {
    potName: mappedFirstEPPot.name,
    newTotal: mappedFirstEPPot.total,
  };

  beforeEach((): void => {
    (axios.get as jest.Mock).mockResolvedValue({ data: mockedPotsDTO });
    (axios.post as jest.Mock).mockResolvedValue(undefined);
    (axios.delete as jest.Mock).mockResolvedValue(undefined);
    (axios.put as jest.Mock).mockResolvedValue(undefined);
  });

  it('maps array APIPotDTO to array EPPot correctly', async (): Promise<void> => {
    const pots: EPPot[] = await getPots();
    expect(pots).toEqual(mockedPots2);
  });

  it('returns fallback values if fetching pots fails', async (): Promise<void> => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation();
    (axios.get as jest.Mock).mockRejectedValue(new Error('Network Error'));

    const pots: EPPot[] = await getPots();

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining('Unable to fetch Pots:'));
    expect(pots).toHaveLength(5);
    expect(pots.at(0)).toEqual(firstEPPot);
  });

  it('sends a POST request to add a new Pot and resolves successfully', async (): Promise<void> => {
    await addNewPot(firstEPPot);

    expect(axios.post).toHaveBeenCalledWith(
      'https://backend.philippkraatz.com/api/pots/addNewPot',
      mappedFirstEPPot,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('returns error if posting new pot fails', async () => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation();
    (axios.post as jest.Mock).mockRejectedValue(new Error('Service Unavailable'));

    await addNewPot(firstEPPot);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Unable to add new Pot: Error: Service Unavailable; Service Unavailable'
      )
    );
  });

  it('sends a PUT request to edit a Pot and resolves successfully', async (): Promise<void> => {
    await editPot(firstEPeditedPot);

    expect(axios.put).toHaveBeenCalledWith(
      'https://backend.philippkraatz.com/api/pots/editPot',
      mappedFirstEPeditedPot,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('returns error if editing pot fails', async () => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation();
    (axios.put as jest.Mock).mockRejectedValue(new Error('Service Unavailable'));

    await editPot(firstEPeditedPot);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Unable to edit Pot: Error: Service Unavailable; Service Unavailable')
    );
  });

  it('sends a DELETE request to delete a Pot and resolves successfully', async (): Promise<void> => {
    await deletePot(firstEPPot);

    expect(axios.delete).toHaveBeenCalledWith(
      'https://backend.philippkraatz.com/api/pots/deletePot',
      { headers: { 'Content-Type': 'application/json' }, data: { potName: firstEPPot.name } }
    );
  });

  it('returns error if deleting a pot fails', async () => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation();
    (axios.delete as jest.Mock).mockRejectedValue(new Error('Service Unavailable'));

    await deletePot(firstEPPot);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Unable to delete Pot: Error: Service Unavailable; Service Unavailable'
      )
    );
  });

  it('sends a PUT request to update the total of a Pot and resolves successfully', async (): Promise<void> => {
    await updatePotTotal(firstEPPot);

    expect(axios.put).toHaveBeenCalledWith(
      'https://backend.philippkraatz.com/api/pots/updatePotTotal',
      newPotTotalDTO,
      { headers: { 'Content-Type': 'application/json' } }
    );
  });

  it('returns error if updating total of a pot fails', async () => {
    const consoleErrorSpy: jest.SpyInstance = jest.spyOn(console, 'error').mockImplementation();
    (axios.put as jest.Mock).mockRejectedValue(new Error('Service Unavailable'));

    await updatePotTotal(firstEPPot);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      expect.stringContaining(
        'Unable to update Pot: Error: Service Unavailable; Service Unavailable'
      )
    );
  });
});
