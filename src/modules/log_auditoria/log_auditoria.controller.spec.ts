import { Test, TestingModule } from '@nestjs/testing';
import { LogAuditoriaController } from './log_auditoria.controller';
import { LogAuditoriaService } from './log_auditoria.service';

describe('LogAuditoriaController', () => {
  let controller: LogAuditoriaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogAuditoriaController],
      providers: [LogAuditoriaService],
    }).compile();

    controller = module.get<LogAuditoriaController>(LogAuditoriaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
