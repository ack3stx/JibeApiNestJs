import { Test, TestingModule } from '@nestjs/testing';
import { OrdenTrabajoPreventivoService } from './orden-trabajo-preventivo.service';

describe('OrdenTrabajoPreventivoService', () => {
  let service: OrdenTrabajoPreventivoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenTrabajoPreventivoService],
    }).compile();

    service = module.get<OrdenTrabajoPreventivoService>(OrdenTrabajoPreventivoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
