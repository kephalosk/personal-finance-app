import { Test, TestingModule } from '@nestjs/testing';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { NotFoundException } from '@nestjs/common';
import { APIPotNameDTO } from '../../model/apis/APIPotNameDTO';
import { APIPotAdditionDTO } from '../../model/apis/APIPotAdditionDTO';
import { APIPotDTO } from '../../model/apis/APIPotDTO';

jest.mock('./pots.service', (): { PotsService: jest.Mock } => ({
  PotsService: jest.fn().mockImplementation(
    (): {
      findAll: jest.Mock;
      addNewPot: jest.Mock;
      editPot: jest.Mock;
      deletePot: jest.Mock;
      addMoneyToPot: jest.Mock;
    } => ({
      findAll: jest.fn(),
      addNewPot: jest.fn(),
      editPot: jest.fn(),
      deletePot: jest.fn(),
      addMoneyToPot: jest.fn(),
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

const amountToAdd: number = 1000;
const mockedPotAddition: APIPotAdditionDTO = {
  potName: mockedPots[0].name,
  amountToAdd,
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

    controller = module.get<PotsController>(PotsController);
  });

  it('should be defined', (): void => {
    expect(controller).toBeDefined();
  });

  it('returns transactions', async (): Promise<void> => {
    const result = await controller.getPots();

    expect(result).toEqual(mockedPots);
  });

  it('throws if service call fails', async (): Promise<void> => {
    (potsService.findAll as jest.Mock).mockImplementation((): void => {
      throw new Error('Service failure');
    });

    await expect(() => controller.getPots()).rejects.toThrow(
      'Error getting pots: Service failure',
    );
  });

  it('throws NotFoundException if no pot is found', async (): Promise<void> => {
    (potsService.findAll as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException('Service failure');
    });

    await expect(() => controller.getPots()).rejects.toThrow('Pots not found.');
  });

  it('adds new pot', async (): Promise<void> => {
    await controller.addNewPot(mockedPots[0]);

    expect(potsService.addNewPot).toHaveBeenCalledWith(mockedPots[0]);
  });

  it('throws if adding new pot call fails', async (): Promise<void> => {
    (potsService.addNewPot as jest.Mock).mockImplementation((): void => {
      throw new Error('Service failure');
    });

    await expect(() => controller.addNewPot(mockedPots[0])).rejects.toThrow(
      'Error adding new pot: Service failure',
    );
  });

  it('edits an existing pot', async (): Promise<void> => {
    await controller.editPot(mockedEditedPot);

    expect(potsService.editPot).toHaveBeenCalledWith(mockedEditedPot);
  });

  it('throws if editing pot call fails', async (): Promise<void> => {
    (potsService.editPot as jest.Mock).mockImplementation((): void => {
      throw new Error('Service failure');
    });

    await expect(() => controller.editPot(mockedEditedPot)).rejects.toThrow(
      'Error while editing pot: Service failure',
    );
  });

  it('throws NotFoundException if finding pot fails', async (): Promise<void> => {
    (potsService.editPot as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException('Service failure');
    });

    await expect(() => controller.editPot(mockedEditedPot)).rejects.toThrow(
      'Pot not found.',
    );
  });

  it('deletes an existing pot', async (): Promise<void> => {
    await controller.deletePot(mockedPotName);

    expect(potsService.deletePot).toHaveBeenCalledWith(mockedPots[0].name);
  });

  it('throws if deleting pot call fails', async (): Promise<void> => {
    (potsService.deletePot as jest.Mock).mockImplementation((): void => {
      throw new Error('Service failure');
    });

    await expect(() => controller.deletePot(mockedPotName)).rejects.toThrow(
      'Error while deleting pot: Service failure',
    );
  });

  it('throws NotFoundException if finding pot to delete fails', async (): Promise<void> => {
    (potsService.deletePot as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException('Service failure');
    });

    await expect(() => controller.deletePot(mockedPotName)).rejects.toThrow(
      'Pot not found.',
    );
  });

  it('adds money to an existing pot', async (): Promise<void> => {
    await controller.addMoneyToPot(mockedPotAddition);

    expect(potsService.addMoneyToPot).toHaveBeenCalledWith(mockedPotAddition);
  });

  it('throws if editing pot call fails', async (): Promise<void> => {
    (potsService.addMoneyToPot as jest.Mock).mockImplementation((): void => {
      throw new Error('Service failure');
    });

    await expect(() =>
      controller.addMoneyToPot(mockedPotAddition),
    ).rejects.toThrow('Error while adding money to pot: Service failure');
  });

  it('throws NotFoundException if finding pot fails', async (): Promise<void> => {
    (potsService.addMoneyToPot as jest.Mock).mockImplementation((): void => {
      throw new NotFoundException('Service failure');
    });

    await expect(() =>
      controller.addMoneyToPot(mockedPotAddition),
    ).rejects.toThrow('Pot not found.');
  });
});
