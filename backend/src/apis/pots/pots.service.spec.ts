import { Test, TestingModule } from '@nestjs/testing';
import { PotsService } from './pots.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Repository } from 'typeorm';
import { Pots } from '../../model/entities/Pots';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIPotDTO } from '../../model/apis/APIPotDTO';

jest.spyOn(console, 'error').mockImplementation(() => {});

describe('PotsService', () => {
  let service: PotsService;
  let repository: Repository<Pots>;

  const mockedPotsEntity: Pots[] = [
    {
      id: 1,
      name: 'Holiday',
      target: 3000.0,
      total: 2000.0,
      theme: '#277C78',
    },
    {
      id: 2,
      name: 'Laptop',
      target: 1500.0,
      total: 1000.0,
      theme: '#626070',
    },
  ];

  const mockedPotsEntityMapped: APIPotDTO[] = [
    {
      name: 'Holiday',
      target: 3000.0,
      total: 2000.0,
      theme: '#277C78',
    },
    {
      name: 'Laptop',
      target: 1500.0,
      total: 1000.0,
      theme: '#626070',
    },
  ];

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
    const mockRepository = {
      find: jest.fn().mockResolvedValue(mockedPotsEntity),
      create: jest.fn().mockReturnValue(mockedPotsEntity[0]),
      save: jest.fn().mockResolvedValue(mockedPotsEntity[0]),
    };

    jest
      .spyOn(path, 'join')
      .mockReturnValue('/mocked/path/to/transactions.data.json');
    jest.spyOn(fs, 'readFileSync').mockReturnValue(mockedPotsDTOJson);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PotsService,
        {
          provide: getRepositoryToken(Pots),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<PotsService>(PotsService);
    repository = module.get<Repository<Pots>>(getRepositoryToken(Pots));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns pots from repository', async () => {
    const result = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedPotsEntityMapped);
    expect(result).not.toEqual(mockedPots);
  });

  it('returns pots from file if repository fails', async () => {
    jest
      .spyOn(repository, 'find')
      .mockRejectedValue(new Error('Database error'));

    const result = await service.findAll();

    expect(result).toEqual(mockedPots);
    expect(result).not.toEqual(mockedPotsEntityMapped);
  });

  it('saves new pot to repository', async () => {
    await service.addNewPot(mockedPotsEntityMapped[0]);

    expect(repository.create).toHaveBeenCalledWith(mockedPotsEntityMapped[0]);

    expect(repository.save).toHaveBeenCalledWith(mockedPotsEntity[0]);
  });

  it('returns pots from file if repository fails', async () => {
    jest
      .spyOn(repository, 'save')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.addNewPot(mockedPotsEntityMapped[0]),
    ).rejects.toThrow('Could not add pot.');
  });
});
