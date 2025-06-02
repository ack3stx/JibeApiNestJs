import { Test, TestingModule } from '@nestjs/testing';
import { SubsidiariaService } from './subsidiaria.service';

describe('SubsidiariaService', () => {
  let service: SubsidiariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubsidiariaService],
    }).compile();

    service = module.get<SubsidiariaService>(SubsidiariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
