import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { FXQLService } from './FXQL.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [FXQLService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  const testToken = {
    FXQL: 'USD-GBP {\\n  BUY 0.85\\n  SELL 0.90\\n  CAP 10000\\n}\\n\\nEUR-JPY {\\n  BUY 145.20\\n  SELL 146.50\\n  CAP 50000\\n}\\n\\nNGN-USD {\\n  BUY 0.0022\\n  SELL 0.0023\\n  CAP 2000000\\n}',
  };

  describe('app controller', () => {

    it('it should be defined', ()=> {
      expect(appController).toBeDefined();
    })

    it('it should return a status of 201', ()=> {
      
    })
    it('should return "Hello World!"', () => {
      expect(appController.parseData(testToken)).toBe('Hello World!');
    });
  });
});
