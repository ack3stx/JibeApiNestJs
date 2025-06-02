import { Test, TestingModule } from '@nestjs/testing';
import { LogAuditoriaService } from './log_auditoria.service';

describe('LogAuditoriaService', () => {
  let service: LogAuditoriaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogAuditoriaService],
    }).compile();

    service = module.get<LogAuditoriaService>(LogAuditoriaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
