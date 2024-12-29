import { Test, TestingModule } from '@nestjs/testing';
import { PotsService } from './pots.service';
import * as path from 'node:path';
import * as fs from 'node:fs';
import { Repository } from 'typeorm';
import { Pots } from '../../model/entities/Pots';
import { getRepositoryToken } from '@nestjs/typeorm';
import { APIPotDTO } from '../../model/apis/APIPotDTO';
import { APIEditedPotDTO } from '../../model/apis/APIEditedPotDTO';
import { APIPotAdditionDTO } from '../../model/apis/APIPotAdditionDTO';
import { APIPotSubtractionDTO } from '../../model/apis/APIPotSubtractionDTO';

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

  const mockedEditedPotEntityMapped: APIEditedPotDTO = {
    ...mockedPotsEntityMapped[0],
    oldName: 'Holiday',
  };

  const amountToAdd: number = 1000;
  const mockedPotAdditionEntityMapped: APIPotAdditionDTO = {
    potName: mockedPotsEntityMapped[0].name,
    amountToAdd,
  };

  const amountToSubtract: number = 1000;
  const mockedPotSubtractionEntityMapped: APIPotSubtractionDTO = {
    potName: mockedPotsEntityMapped[0].name,
    amountToSubtract,
  };

  const bigAmountToSubtract: number = 10000;
  const mockedPotSubtractionEntityMappedWithBigAmount: APIPotSubtractionDTO = {
    potName: mockedPotsEntityMapped[0].name,
    amountToSubtract: bigAmountToSubtract,
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

  const mockedPotsDTO: {
    pots: APIPotDTO[];
  } = {
    pots: mockedPots,
  };
  const mockedPotsDTOJson: string = JSON.stringify(mockedPotsDTO);

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

  it('should be defined', (): void => {
    expect(service).toBeDefined();
  });

  it('returns pots from repository', async (): Promise<void> => {
    const result: APIPotDTO[] = await service.findAll();

    expect(repository.find).toHaveBeenCalled();
    expect(result).toEqual(mockedPotsEntityMapped);
    expect(result).not.toEqual(mockedPots);
  });

  it('returns pots from file if repository fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'find')
      .mockRejectedValue(new Error('Database error'));

    const result: APIPotDTO[] = await service.findAll();

    expect(result).toEqual(mockedPots);
    expect(result).not.toEqual(mockedPotsEntityMapped);
  });

  it('saves new pot to repository', async (): Promise<void> => {
    await service.addNewPot(mockedPotsEntityMapped[0]);

    expect(repository.create).toHaveBeenCalledWith(mockedPotsEntityMapped[0]);

    expect(repository.save).toHaveBeenCalledWith(mockedPotsEntity[0]);
  });

  it('returns pots from file if repository fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'save')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.addNewPot(mockedPotsEntityMapped[0]),
    ).rejects.toThrow('Could not add pot.');
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

  it('throws an error if editing pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'update')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow('Could not edit pot.');
  });

  it('throws an error if finding pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'findOne')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.editPot(mockedEditedPotEntityMapped),
    ).rejects.toThrow('Could not edit pot.');
  });

  it('deletes a pot in repository', async (): Promise<void> => {
    await service.deletePot(mockedPots[0].name);

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { name: mockedPots[0].name },
    });

    expect(repository.remove).toHaveBeenCalledWith(mockedPotsEntity[0]);
  });

  it('throws an error if deleting pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'remove')
      .mockRejectedValue(new Error('Database error'));

    await expect(() => service.deletePot(mockedPots[0].name)).rejects.toThrow(
      'Could not delete pot.',
    );
  });

  it('throws an error if finding pot to delete fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'findOne')
      .mockRejectedValue(new Error('Database error'));

    await expect(() => service.deletePot(mockedPots[0].name)).rejects.toThrow(
      'Could not delete pot.',
    );
  });

  it('adds money to a pot in repository', async (): Promise<void> => {
    await service.addMoneyToPot(mockedPotAdditionEntityMapped);

    expect(repository.findOne).toHaveBeenLastCalledWith({
      where: { name: mockedPotAdditionEntityMapped.potName },
    });

    expect(repository.update).toHaveBeenLastCalledWith(1, { total: 3000 });
  });

  it('throws an error if adding money to pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'update')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.addMoneyToPot(mockedPotAdditionEntityMapped),
    ).rejects.toThrow('Could not add money to pot.');
  });

  it('throws an error if finding pot to delete fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'findOne')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.addMoneyToPot(mockedPotAdditionEntityMapped),
    ).rejects.toThrow('Could not add money to pot.');
  });

  it('withdraws money from a pot in repository', async (): Promise<void> => {
    await service.withdrawMoneyFromPot(mockedPotSubtractionEntityMapped);

    expect(repository.findOne).toHaveBeenLastCalledWith({
      where: { name: mockedPotSubtractionEntityMapped.potName },
    });

    expect(repository.update).toHaveBeenLastCalledWith(1, { total: 1000 });
  });

  it('sets new total to 0 if current pot total is less than amount to subtract', async (): Promise<void> => {
    await service.withdrawMoneyFromPot(
      mockedPotSubtractionEntityMappedWithBigAmount,
    );

    expect(repository.findOne).toHaveBeenLastCalledWith({
      where: { name: mockedPotSubtractionEntityMapped.potName },
    });

    expect(repository.update).toHaveBeenLastCalledWith(1, { total: 0 });
  });

  it('throws an error if withdrawing money from pot fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'update')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.withdrawMoneyFromPot(mockedPotSubtractionEntityMapped),
    ).rejects.toThrow('Could not withdraw money from pot.');
  });

  it('throws an error if finding pot to delete fails', async (): Promise<void> => {
    jest
      .spyOn(repository, 'findOne')
      .mockRejectedValue(new Error('Database error'));

    await expect(() =>
      service.withdrawMoneyFromPot(mockedPotSubtractionEntityMapped),
    ).rejects.toThrow('Could not withdraw money from pot.');
  });
});
