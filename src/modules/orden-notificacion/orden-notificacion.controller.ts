import { Controller } from '@nestjs/common';
import { OrdenNotificacionService } from './orden-notificacion.service';

@Controller('orden-notificacion')
export class OrdenNotificacionController {
  constructor(private readonly ordenNotificacionService: OrdenNotificacionService) {}
}
