import { Module } from '@nestjs/common';
import { OrdenNotificacionService } from './orden-notificacion.service';
import { OrdenNotificacionController } from './orden-notificacion.controller';

@Module({
  controllers: [OrdenNotificacionController],
  providers: [OrdenNotificacionService],
})
export class OrdenNotificacionModule {}
