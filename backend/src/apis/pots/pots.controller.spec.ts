import { Test, TestingModule } from '@nestjs/testing';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import {
  InternalServerErrorException,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { APIPotNameDTO } from '../../model/apis/APIPotNameDTO';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { APIPotTotalDTO } from '../../model/apis/APIPotTotalDTO';

jest.mock('./pots.service', (): { PotsService: jest.Mock } => ({
  PotsService: jest.fn().mockImplementation(
    (): {
      findAll: jest.Mock;
      addNewPot: jest.Mock;
      editPot: jest.Mock;
      deletePot: jest.Mock;
      updatePotTotal: jest.Mock;
    } => ({
      findAll: jest.fn(),
      addNewPot: jest.fn(),
      editPot: jest.fn(),
      deletePot: jest.fn(),
      updatePotTotal: jest.fn(),
    }),
  ),
}));

const mockedPots: APIPotDTO[] = [
  {
    name: 'Savings',
    target: 2000.0,
    total: 159.0,
    theme: '#277C78',
  },
  {
    name: 'Concert Ticket',
    target: 150.0,
    total: 110.0,
    theme: '#626070',
  },
];

const mockedEditedPot: APIEditedPotDTO = {
  ...mockedPots[0],
  oldName: mockedPots[0].name,
};

const newTotal = 1000;
const mockedPotTotal: APIPotTotalDTO = {
  potName: mockedPots[0].name,
  newTotal,
};

const mockedPotName: APIPotNameDTO = {
  potName: mockedPots[0].name,
};

describe('PotsController', (): void => {
  let controller: PotsController;
  let potsService: PotsService;

  beforeEach(async (): Promise<void> => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotsController],
      providers: [PotsService],
    }).compile();

    potsService = module.get<PotsService>(PotsService);
    (potsService.findAll as jest.Mock).mockResolvedValue(mockedPots);
    (potsService.addNewPot as jest.Mock).mockResolvedValue(undefined);
    (potsService.editPot as jest.Mock).mockResolvedValue(undefined);
    (potsService.deletePot as jest.Mock).mockResolvedValue(undefined);
    (potsService.updatePotTotal as jest.Mock).mockResolvedValue(undefined);

    controller = module.get<PotsController>(PotsController);
  });

  it('is defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('returns pots', async (): Promise<void> => {
    const result: APIPotDTO[] = await controller.getPots();

    expect(result).toEqual(mockedPots);
  });

  it('throws if service call fails', async (): Promise<void> => {
    (potsService.findAll as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow('Error getting pots: Service failure');
  });

  it('throws NotFoundException if no pots are found', async (): Promise<void> => {
    (potsService.findAll as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow('Pots not found.');
  });

  it('throws if database connection fails', async (): Promise<void> => {
    (potsService.findAll as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<APIPotDTO[]> => controller.getPots(),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('adds new pot', async (): Promise<void> => {
    await controller.addNewPot(mockedPots[0]);

    expect(potsService.addNewPot).toHaveBeenCalledWith(mockedPots[0]);
  });

  it('throws if adding new pot call fails', async (): Promise<void> => {
    (potsService.addNewPot as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.addNewPot(mockedPots[0]),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.addNewPot(mockedPots[0]),
    ).rejects.toThrow('Error adding new pot: Service failure');
  });

  it('throws if database connection to edit pot fails', async (): Promise<void> => {
    (potsService.addNewPot as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.addNewPot(mockedPots[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.addNewPot(mockedPots[0]),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('edits an existing pot', async (): Promise<void> => {
    await controller.editPot(mockedEditedPot);

    expect(potsService.editPot).toHaveBeenCalledWith(mockedEditedPot);
  });

  it('throws if editing pot call fails', async (): Promise<void> => {
    (potsService.editPot as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow('Error while editing pot: Service failure');
  });

  it('throws NotFoundException if finding pot fails', async (): Promise<void> => {
    (potsService.editPot as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });
    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow('Pot not found.');
  });

  it('throws if database connection to edit pot fails', async (): Promise<void> => {
    (potsService.editPot as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.editPot(mockedEditedPot),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('deletes an existing pot', async (): Promise<void> => {
    await controller.deletePot(mockedPotName);

    expect(potsService.deletePot).toHaveBeenCalledWith(mockedPots[0].name);
  });

  it('throws if deleting pot call fails', async (): Promise<void> => {
    (potsService.deletePot as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow('Error while deleting pot: Service failure');
  });

  it('throws NotFoundException if finding pot to delete fails', async (): Promise<void> => {
    (potsService.deletePot as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow('Pot not found.');
  });

  it('throws if database connection to delete pot fails', async (): Promise<void> => {
    (potsService.deletePot as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.deletePot(mockedPotName),
    ).rejects.toThrow('Database connection error: Connection failed');
  });

  it('updates total of an existing pot', async (): Promise<void> => {
    await controller.updatePotTotal(mockedPotTotal);

    expect(potsService.updatePotTotal).toHaveBeenCalledWith(mockedPotTotal);
  });

  it('throws if updating total of pot call fails', async (): Promise<void> => {
    (potsService.updatePotTotal as jest.Mock).mockImplementation((): void => {
      throw new InternalServerErrorException('Service failure');
    });

    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow(InternalServerErrorException);
    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow(
      'Error while updating total amount of pot: Service failure',
    );
  });

  it('throws NotFoundException if finding pot to add to fails', async (): Promise<void> => {
    (potsService.updatePotTotal as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException();
    });

    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow('Pot not found.');
  });

  it('throws if database connection to add to pot fails', async (): Promise<void> => {
    (potsService.updatePotTotal as jest.Mock).mockImplementation((): void => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => controller.updatePotTotal(mockedPotTotal),
    ).rejects.toThrow('Database connection error: Connection failed');
  });
});
