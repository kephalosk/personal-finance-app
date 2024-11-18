import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Repository } from 'typeorm';
import { Balance } from '../../model/entities/Balance';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('BalanceService', () => {
  let service: BalanceService;
  let repository: Repository<Balance>;

  const mockedBalanceEntity: Balance = {
    id: 1,
    current: 1111,
    income: 5555,
    expenses: 2222,
  };

  const mockedBalanceEntityMapped: APIBalanceDTO = {
    current: 1111,
    income: 5555,
    expenses: 2222,
  };

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
    const mockRepository = {
      find: jest.fn().mockResolvedValue([mockedBalanceEntity]),
    };

    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/balance.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedBalanceDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BalanceService,
        {
          provide: getRepositoryToken(Balance),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
    repository = module.get<Repository<Balance>>(getRepositoryToken(Balance));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns balance from repository', async () => {
    const result = await service.findBalance();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedBalanceEntityMapped);
    expect(result).not.toEqual(mockedBalance);
  });

  it('returns balance from file if repository fails', async () => {
    jest
      .spyOn(repository, 'find')
      .mockRejectedValue(new Error('Database error'));

    const result = await service.findBalance();

    expect(result).toEqual(mockedBalance);
    expect(result).not.toEqual(mockedBalanceEntityMapped);
  });
});
