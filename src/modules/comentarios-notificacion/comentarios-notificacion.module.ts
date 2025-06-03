import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosNotificacionService } from './comentarios-notificacion.service';
import { ComentariosNotificacionController } from './comentarios-notificacion.controller';
import { ComentariosNotifi } from './entities/ComentariosNotifi.entity';
import { Notificaciones } from '../notificaciones/entities/notificacion.entity';
import { OrdenTrabajo } from '../orden-trabajo/entities/orden-trabajo.entity';
import { EmailService } from 'src/config/email.service';
@Module({
  imports: [TypeOrmModule.forFeature([ComentariosNotifi, Notificaciones,OrdenTrabajo])],
  controllers: [ComentariosNotificacionController],
  providers: [ComentariosNotificacionService, EmailService],
})
export class ComentariosNotificacionModule {}