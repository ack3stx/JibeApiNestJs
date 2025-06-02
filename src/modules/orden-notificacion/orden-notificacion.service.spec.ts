import { Test, TestingModule } from '@nestjs/testing';
import { OrdenNotificacionService } from './orden-notificacion.service';

describe('OrdenNotificacionService', () => {
  let service: OrdenNotificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdenNotificacionService],
    }).compile();

    service = module.get<OrdenNotificacionService>(OrdenNotificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
