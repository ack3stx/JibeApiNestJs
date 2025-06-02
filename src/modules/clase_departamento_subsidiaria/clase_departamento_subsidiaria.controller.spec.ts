import { Test, TestingModule } from '@nestjs/testing';
import { ClaseDepartamentoSubsidiariaController } from './clase_departamento_subsidiaria.controller';
import { ClaseDepartamentoSubsidiariaService } from './clase_departamento_subsidiaria.service';

describe('ClaseDepartamentoSubsidiariaController', () => {
  let controller: ClaseDepartamentoSubsidiariaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClaseDepartamentoSubsidiariaController],
      providers: [ClaseDepartamentoSubsidiariaService],
    }).compile();

    controller = module.get<ClaseDepartamentoSubsidiariaController>(ClaseDepartamentoSubsidiariaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
