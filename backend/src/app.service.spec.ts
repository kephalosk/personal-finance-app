import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { Balance } from './model/entities/Balance';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('AppService', () => {
  let service: AppService;
  let repository: Repository<Balance>;

  const mockedAnswer = { '?column?': 1 };

  beforeEach(async () => {
    const mockRepository = {
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calls repository for Health Check', async () => {
    await service.isDatabaseHealthy();

    expect(repository.query).toHaveBeenCalled();
  });

  it('returns balance from file if repository fails', async () => {
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
