import { Test, TestingModule } from '@nestjs/testing';
import { PotsService } from './pots.service';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('PotsService', () => {
  let service: PotsService;

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

  const mockedPotsDTO = {
    pots: mockedPots,
  };

  const mockedPotsDTOJson = JSON.stringify(mockedPotsDTO);

  beforeEach(async () => {
    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedPotsDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [PotsService],
    }).compile();

    service = module.get<PotsService>(PotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns pots', () => {
    expect(service.getPots()).toEqual(mockedPots);
  });
});
