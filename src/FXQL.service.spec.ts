import { Test, TestingModule } from '@nestjs/testing';
import { FXQLService } from './FXQL.service';
import { PrismaService } from './prisma/prisma.service';
import { FXQLDto } from './dto';
import { PrismaModule } from './prisma/prisma.module';

describe('FXQLService', () => {
  let fxql: FXQLService;
  const prismaMock = {
    transactionPool: {
      createMany: jest.fn(),
    },
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FXQLService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    fxql = module.get<FXQLService>(FXQLService);
  });

  it('should be defined', () => {
    expect(fxql).toBeDefined();
  });

  const testToken = {
    FXQL: 'USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}',
  };
  //it('should call mock prisma', () => {
  //  prismaMock.transactionPool.createMany.mockResolvedValueOnce({
  //    count: 5,
  //  });
  //});
  it('should call processdata function', async () => {
    prismaMock.transactionPool.createMany.mockResolvedValueOnce({
      count: 1,
    });

    const result = await fxql.processData(testToken.FXQL);
    expect(result).toEqual({
      message: 'FXQL Statement Parsed Successfully.',
      code: 'FXQL-201',
      data: [
        {
          BuyPrice: 100,
          CapAmount: 93800,
          DestinationCurrency: 'GBP',
          EntryId: expect.any(String),
          SellPrice: 200,
          SourceCurrency: 'USD',
        },
      ],
    });
  });
});
