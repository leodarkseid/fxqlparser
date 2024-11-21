import { Test, TestingModule } from '@nestjs/testing';
import { FXQLService } from './app.service';
import { RegexDataValidator } from './dto/index';

describe('FXQLService', () => {
  let service: FXQLService;
  let validator: RegexDataValidator;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FXQLService,
        {
          provide: RegexDataValidator,
          useValue: {
            validCurrencyPair: jest.fn().mockReturnValue(true), // Mocking method
          },
        },
      ],
    }).compile();

    service = module.get<FXQLService>(FXQLService);
    validator = module.get<RegexDataValidator>(RegexDataValidator);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return no errors for a valid FXQL', () => {
    const errors = validator.validate('USD-EUR');
    expect(errors).toHaveLength(0);
  });

  it('should return error for an invalid FXQL', () => {
  
    const errors = validator.validate('usd-eur');
    expect(errors).toHaveLength(1);
    expect(errors[0]).toBe('Invalid Currency Pair');
  });
});
