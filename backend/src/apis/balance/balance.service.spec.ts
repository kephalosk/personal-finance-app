import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import * as path from 'node:path';
import * as fs from 'node:fs';

describe('BalanceService', () => {
  let service: BalanceService;

  const mockedBalance = {
    current: 1000,
    income: 5000,
    expenses: 2000,
  };
  const mockedBalanceDTO = {
    balance: mockedBalance,
  };
  const mockedBalanceDTOJson = JSON.stringify(mockedBalanceDTO);

  beforeEach(async () => {
    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/balance.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedBalanceDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceService],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns balance', () => {
    expect(service.getBalance()).toEqual(mockedBalance);
  });
});
