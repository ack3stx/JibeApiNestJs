import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosNotificacionController } from './comentarios-notificacion.controller';
import { ComentariosNotificacionService } from './comentarios-notificacion.service';

describe('ComentariosNotificacionController', () => {
  let controller: ComentariosNotificacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentariosNotificacionController],
      providers: [ComentariosNotificacionService],
    }).compile();

    controller = module.get<ComentariosNotificacionController>(ComentariosNotificacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
