import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaPreventivoController } from './cronograma-preventivo.controller';
import { CronogramaPreventivoService } from './cronograma-preventivo.service';

describe('CronogramaPreventivoController', () => {
  let controller: CronogramaPreventivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CronogramaPreventivoController],
      providers: [CronogramaPreventivoService],
    }).compile();

    controller = module.get<CronogramaPreventivoController>(CronogramaPreventivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
