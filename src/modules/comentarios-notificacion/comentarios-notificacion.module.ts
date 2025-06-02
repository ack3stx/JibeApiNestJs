import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ComentariosNotificacionService } from './comentarios-notificacion.service';
import { ComentariosNotificacionController } from './comentarios-notificacion.controller';
import { ComentariosNotifi } from './entities/ComentariosNotifi.entity';
import { Notificaciones } from '../notificaciones/entities/notificacion.entity';
import { OrdenTrabajo } from '../orden-trabajo/entities/orden-trabajo.entity';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [TypeOrmModule.forFeature([ComentariosNotifi, Notificaciones,OrdenTrabajo]),MailerModule],
  controllers: [ComentariosNotificacionController],
  providers: [ComentariosNotificacionService],
})
export class ComentariosNotificacionModule {}