import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Balance } from './model/entities/Balance';

jest.spyOn(console, 'error').mockImplementation((): void => {});

describe('AppService', (): void => {
  let service: AppService;
  let repository: Repository<Balance>;

  const mockedAnswer: { '?column?': number } = { '?column?': 1 };

  beforeEach(async (): Promise<void> => {
    const mockRepository: { query: jest.Mock } = {
      query: jest.fn().mockResolvedValue([mockedAnswer]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AppService,
        {
          provide: getRepositoryToken(Balance),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AppService>(AppService);
    repository = module.get<Repository<Balance>>(getRepositoryToken(Balance));
  });

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('calls repository for Health Check', async (): Promise<void> => {
    await service.isDatabaseHealthy();

    expect(repository.query).toHaveBeenCalled();
  });

  it('returns balance from file if repository fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'query')
      .mockRejectedValue(new Error('Database error'));

    await service.isDatabaseHealthy();

    expect(console.error).toHaveBeenCalledWith(
      'Datenbankverbindung fehlgeschlagen:',
      new Error('Database error'),
    );
  });
});
