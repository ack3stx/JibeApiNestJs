import { Controller } from '@nestjs/common';
import { ComentariosNotificacionService } from './comentarios-notificacion.service';
import { ComentariosNotificacion } from './dto/comentarios-notificacion';
import { Post, Body } from '@nestjs/common';
import { ComentariosNotifi } from './entities/ComentariosNotifi.entity';


@Controller('comentarios-notificacion')
export class ComentariosNotificacionController {
  constructor(private readonly comentariosNotificacionService: ComentariosNotificacionService) {}

  @Post()
  async create(@Body() ComentariosNotificacion: ComentariosNotificacion) {
        return await this.comentariosNotificacionService.NuevoComentarioNotificacion(ComentariosNotificacion);
    }

}
