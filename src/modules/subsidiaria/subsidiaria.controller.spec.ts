import { Test, TestingModule } from '@nestjs/testing';
import { SubsidiariaController } from './subsidiaria.controller';
import { SubsidiariaService } from './subsidiaria.service';

describe('SubsidiariaController', () => {
  let controller: SubsidiariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubsidiariaController],
      providers: [SubsidiariaService],
    }).compile();

    controller = module.get<SubsidiariaController>(SubsidiariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
