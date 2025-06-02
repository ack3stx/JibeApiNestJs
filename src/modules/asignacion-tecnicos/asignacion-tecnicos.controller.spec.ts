import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTecnicosController } from './asignacion-tecnicos.controller';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';

describe('AsignacionTecnicosController', () => {
  let controller: AsignacionTecnicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AsignacionTecnicosController],
      providers: [AsignacionTecnicosService],
    }).compile();

    controller = module.get<AsignacionTecnicosController>(AsignacionTecnicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
