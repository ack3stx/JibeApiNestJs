import { Test, TestingModule } from '@nestjs/testing';
import { OrdenNotificacionController } from './orden-notificacion.controller';
import { OrdenNotificacionService } from './orden-notificacion.service';

describe('OrdenNotificacionController', () => {
  let controller: OrdenNotificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenNotificacionController],
      providers: [OrdenNotificacionService],
    }).compile();

    controller = module.get<OrdenNotificacionController>(OrdenNotificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
