import { Test, TestingModule } from '@nestjs/testing';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';

describe('AsignacionTecnicosService', () => {
  let service: AsignacionTecnicosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AsignacionTecnicosService],
    }).compile();

    service = module.get<AsignacionTecnicosService>(AsignacionTecnicosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
