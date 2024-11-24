import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FXQLService } from './FXQL.service';
import { FXQLDto } from './dto';

describe('AppController', () => {
  let appController: AppController;
  let fXQLService: FXQLService;
  const mockFXQLService = {
    processData: jest.fn((fxql: FXQLDto) => {
      return {
        message: 'FXQL Statement Parsed Successfully.',
        code: 'FXQL-200',
        data: [],
      };
    }),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [FXQLService],
    })
      .overrideProvider(FXQLService)
      .useValue(mockFXQLService)
      .compile();

    appController = app.get<AppController>(AppController);
    fXQLService = app.get<FXQLService>(FXQLService);
  });

  const testToken = {
    FXQL: 'USD-GBP {\\n BUY 100\\n SELL 200\\n CAP 93800\\n}',
  };

  describe('app controller', () => {
    it('it should be defined', () => {
      expect(appController).toBeDefined();
    });

    // it('it should return a status of 201', ()=> {

    // })
    it('should call parseData controller', async () => {
      const result = await appController.parseData(testToken);
      expect(result).toEqual({
        message: 'FXQL Statement Parsed Successfully.',
        code: 'FXQL-200',
        data: [],
      });
      expect(mockFXQLService.processData).toHaveBeenCalled();
      expect(mockFXQLService.processData).toHaveBeenCalledWith(testToken.FXQL);
    });
    //it('should call home controller', () => {
    //  const result = appController.getHome();
    //  console.log('r', result);
    //  //expect(result).toEqual()
    //});
  });
});
