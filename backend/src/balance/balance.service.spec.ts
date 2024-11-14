import { Test, TestingModule } from '@nestjs/testing';
import { BalanceService } from './balance.service';

describe('BalanceService', () => {
  let service: BalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalanceService],
    }).compile();

    service = module.get<BalanceService>(BalanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('returns balance', () => {
    expect(service.getBalance()).toEqual({
      current: 4836,
      expenses: 1700.5,
      income: 3814.25,
    });
  });
});
