import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosNotificacionService } from './comentarios-notificacion.service';

describe('ComentariosNotificacionService', () => {
  let service: ComentariosNotificacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ComentariosNotificacionService],
    }).compile();

    service = module.get<ComentariosNotificacionService>(ComentariosNotificacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
