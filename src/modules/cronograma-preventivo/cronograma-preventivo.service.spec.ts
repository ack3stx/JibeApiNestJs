import { Test, TestingModule } from '@nestjs/testing';
import { CronogramaPreventivoService } from './cronograma-preventivo.service';

describe('CronogramaPreventivoService', () => {
  let service: CronogramaPreventivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CronogramaPreventivoService],
    }).compile();

    service = module.get<CronogramaPreventivoService>(CronogramaPreventivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
