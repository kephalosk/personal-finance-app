import { Test, TestingModule } from '@nestjs/testing';
import { PotsService } from './pots.service';
import { Repository, UpdateResult } from 'typeorm';
import { Pots } from '../../model/entities/Pots';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { APIPotTotalDTO } from '../../model/apis/APIPotTotalDTO';
import { NotFoundException, ServiceUnavailableException } from '@nestjs/common';

describe('PotsService', (): void => {
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

  const mockedEditedPotEntityMapped: APIEditedPotDTO = {
    ...mockedPotsEntityMapped[0],
    oldName: 'Holiday',
  };

  const newTotal = 1000;
  const mockedPotTotalEntityMapped: APIPotTotalDTO = {
    potName: mockedPotsEntityMapped[0].name,
    newTotal,
  };

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

  beforeEach(async (): Promise<void> => {
    const mockRepository: {
      find: jest.Mock;
      create: jest.Mock;
      save: jest.Mock;
      findOne: jest.Mock;
      update: jest.Mock;
      remove: jest.Mock;
    } = {
      find: jest.fn().mockResolvedValue(mockedPotsEntity),
      create: jest.fn().mockReturnValue(mockedPotsEntity[0]),
      save: jest.fn().mockResolvedValue(mockedPotsEntity[0]),
      findOne: jest.fn().mockResolvedValue(mockedPotsEntity[0]),
      update: jest.fn().mockResolvedValue({}),
      remove: jest.fn().mockResolvedValue({}),
    };
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

  it('is defined', (): void => {
    expect(service).toBeDefined();
  });

  it('returns pots from repository', async (): Promise<void> => {
    const result: APIPotDTO[] = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedPotsEntityMapped);
    expect(result).not.toEqual(mockedPots);
  });

  it('throws if pots not found', async (): Promise<void> => {
    jest.spyOn(repository, 'find').mockResolvedValue([]);

    await expect((): Promise<APIPotDTO[]> => service.findAll()).rejects.toThrow(
      NotFoundException,
    );
    await expect((): Promise<APIPotDTO[]> => service.findAll()).rejects.toThrow(
      'No pots found.',
    );
  });

  it('throws when database connection fails', async (): Promise<void> => {
    jest.spyOn(repository, 'find').mockImplementation((): Promise<Pots[]> => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect((): Promise<APIPotDTO[]> => service.findAll()).rejects.toThrow(
      ServiceUnavailableException,
    );
    await expect((): Promise<APIPotDTO[]> => service.findAll()).rejects.toThrow(
      'Connection failed',
    );
  });

  it('saves new pot to repository', async (): Promise<void> => {
    await service.addNewPot(mockedPotsEntityMapped[0]);

    expect(repository.create).toHaveBeenCalledWith(mockedPotsEntityMapped[0]);

    expect(repository.save).toHaveBeenCalledWith(mockedPotsEntity[0]);
  });

  it('throws when database connection to add new pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'save')
      .mockRejectedValue(new ServiceUnavailableException('Connection failed'));

    await expect(
      (): Promise<void> => service.addNewPot(mockedPotsEntityMapped[0]),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.addNewPot(mockedPotsEntityMapped[0]),
    ).rejects.toThrow('Connection failed');
  });

  it('updates a pot in repository', async (): Promise<void> => {
    await service.editPot(mockedEditedPotEntityMapped);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { name: 'Holiday' },
    });

    expect(repository.update).toHaveBeenCalledWith(
      mockedPotsEntity[0].id,
      mockedPotsEntityMapped[0],
    );
  });

  it('throws if pot to update not found', async (): Promise<void> => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      (): Promise<void> => service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow(
      `No pot found with name ${mockedEditedPotEntityMapped.oldName}.`,
    );
  });

  it('throws if database connection to update pot fails', async (): Promise<void> => {
    jest.spyOn(repository, 'findOne').mockImplementation((): Promise<Pots> => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow('Connection failed');
  });

  it('deletes a pot in repository', async (): Promise<void> => {
    await service.deletePot(mockedPots[0].name);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { name: mockedPots[0].name },
    });

    expect(repository.remove).toHaveBeenCalledWith(mockedPotsEntity[0]);
  });

  it('throws if pot to delete not found', async (): Promise<void> => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      (): Promise<void> => service.deletePot(mockedPots[0].name),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => service.deletePot(mockedPots[0].name),
    ).rejects.toThrow(`No pot found with name ${mockedPots[0].name}.`);
  });

  it('throws an error if database connection for deleting pot fails', async (): Promise<void> => {
    jest.spyOn(repository, 'remove').mockImplementation((): Promise<Pots> => {
      throw new ServiceUnavailableException('Connection failed');
    });

    await expect(
      (): Promise<void> => service.deletePot(mockedPots[0].name),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.deletePot(mockedPots[0].name),
    ).rejects.toThrow('Connection failed');
  });

  it('updates total of a pot in repository', async (): Promise<void> => {
    await service.updatePotTotal(mockedPotTotalEntityMapped);

    expect(repository.findOne).toHaveBeenLastCalledWith({
      where: { name: mockedPotTotalEntityMapped.potName },
    });

    expect(repository.update).toHaveBeenLastCalledWith(1, {
      total: mockedPotTotalEntityMapped.newTotal,
    });
  });

  it('throws if pot to update total not found', async (): Promise<void> => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

    await expect(
      (): Promise<void> => service.updatePotTotal(mockedPotTotalEntityMapped),
    ).rejects.toThrow(NotFoundException);
    await expect(
      (): Promise<void> => service.updatePotTotal(mockedPotTotalEntityMapped),
    ).rejects.toThrow(
      `No pot found with name ${mockedPotTotalEntityMapped.potName}.`,
    );
  });

  it('throws an error if database connection for updating total of pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'update')
      .mockImplementation((): Promise<UpdateResult> => {
        throw new ServiceUnavailableException('Connection failed');
      });

    await expect(
      (): Promise<void> => service.updatePotTotal(mockedPotTotalEntityMapped),
    ).rejects.toThrow(ServiceUnavailableException);
    await expect(
      (): Promise<void> => service.updatePotTotal(mockedPotTotalEntityMapped),
    ).rejects.toThrow('Connection failed');
  });
});
