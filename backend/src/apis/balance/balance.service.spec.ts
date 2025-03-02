import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';
import { Repository } from 'typeorm';
import { Balance } from '../../model/entities/Balance';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIBalanceDTO } from '../../model/apis/APIBalanceDTO';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';

jest.spyOn(console, 'error').mockImplementation(() => null);

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

  const mockedBalance: APIBalanceDTO = {
    current: 1000,
    income: 5000,
    expenses: 2000,
  };

  beforeEach(async (): Promise<void> => {
    const mockRepository: { find: jest.Mock } = {
      find: jest.fn().mockResolvedValue([mockedBalanceEntity]),
    };

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

  it('is defined', (): void => {
    expect(service).toBeDefined();
  });

  it('returns balance from repository', async (): Promise<void> => {
    const result: APIBalanceDTO = await service.findBalance();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedBalanceEntityMapped);
    expect(result).not.toEqual(mockedBalance);
  });

  it('throws if balance is not found', async (): Promise<void> => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect(
      (): Promise<APIBalanceDTO> => service.findBalance(),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<APIBalanceDTO> => service.findBalance(),
    ).rejects.toThrow('No balance found.');
  });

  it('throws if database connection fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'find')
      .mockImplementation((): Promise<Balance[]> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<APIBalanceDTO> => service.findBalance(),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<APIBalanceDTO> => service.findBalance(),
    ).rejects.toThrow('Connection failed');
  });
});
