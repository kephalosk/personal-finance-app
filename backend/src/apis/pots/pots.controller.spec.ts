import { Test, TestingModule } from '@nestjs/testing';
import { PotsController } from './pots.controller';
import { PotsService } from './pots.service';

jest.mock('./pots.service', () => ({
  PotsService: jest.fn().mockImplementation(() => ({
    findAll: jest.fn(),
    addNewPot: jest.fn(),
  })),
}));

const mockedPots = [
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

describe('PotsController', () => {
  let controller: PotsController;
  let potsService: PotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PotsController],
      providers: [PotsService],
    }).compile();

    potsService = module.get<PotsService>(PotsService);
    (potsService.findAll as jest.Mock).mockResolvedValue(mockedPots);
    (potsService.addNewPot as jest.Mock).mockResolvedValue(undefined);

    controller = module.get<PotsController>(PotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns transactions', async () => {
    const result = await controller.getPots();

    expect(result).toEqual(mockedPots);
  });

  it('throws if service call fails', async () => {
    (potsService.findAll as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() => controller.getPots()).rejects.toThrow(
      'Fehler beim Abrufen der Pots: Error: Service failure',
    );
  });

  it('adds new pot', async () => {
    await controller.addNewPot(mockedPots[0]);

    expect(potsService.addNewPot).toHaveBeenCalledWith(mockedPots[0]);
  });

  it('throws if adding new pot call fails', async () => {
    (potsService.addNewPot as jest.Mock).mockImplementation(() => {
      throw new Error('Service failure');
    });

    await expect(() => controller.addNewPot(mockedPots[0])).rejects.toThrow(
      'Error adding new pot: Service failure',
    );
  });
});
