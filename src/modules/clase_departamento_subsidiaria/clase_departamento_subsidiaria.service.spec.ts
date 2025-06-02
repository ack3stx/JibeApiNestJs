import { Test, TestingModule } from '@nestjs/testing';
import { ClaseDepartamentoSubsidiariaService } from './clase_departamento_subsidiaria.service';

describe('ClaseDepartamentoSubsidiariaService', () => {
  let service: ClaseDepartamentoSubsidiariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClaseDepartamentoSubsidiariaService],
    }).compile();

    service = module.get<ClaseDepartamentoSubsidiariaService>(ClaseDepartamentoSubsidiariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
