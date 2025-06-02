import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request } from '@nestjs/common';
import { NotificacionesService } from './notificaciones.service';
import { CreateNotificacioneDto } from './dto/create-notificacione.dto';
import { UpdateNotificacioneDto } from './dto/update-notificacione.dto';
import { UserGuard } from 'src/auth/guards/UserGuard.guard';
import { UseGuards, HttpCode } from '@nestjs/common';
import { Notificaciones } from './entities/notificacion.entity';
import { RoleGuard } from 'src/auth/guards/role/role.guard';

@Controller('notificacion')
export class NotificacionesController {

  constructor( 
  @Inject()
  private readonly NotificacionesService: NotificacionesService) {

  }

      @Post()
      @UseGuards(UserGuard)
      @HttpCode(201)
      async notificacion(@Body() Notificaciones: CreateNotificacioneDto, @Request() req) {
          const resultado = await this.NotificacionesService.createNotificacion(Notificaciones);
          return {
              message: 'Notificación creada',
              notificacion: resultado.Notificacion,
              titulo_sugerido: resultado.titulo_sugerido
          };
      }

      @Get()
      @UseGuards(UserGuard)
      @HttpCode(200)
      async getNotificaciones(@Request() req) {
          const userId = req.user.id; // Cambia userId por id si ese es el nombre en tu token
          return this.NotificacionesService.findAllNotificacionesForUser(userId);
      }

      @Get('Gerencia')
          @UseGuards(UserGuard,RoleGuard)
          async getNotificacionesAdmin(@Request() req) {
              return this.NotificacionesService.findAllNotificacionesForGerente();
      }

      @Get('NoticacionesSeleccionadas')
      @UseGuards(UserGuard)
      @HttpCode(200)
      async GetNotificacionesSeleccionadas(@Request() req) {
        return this.NotificacionesService.BuscarNotificacionesFiltros(req.body);
    }
}
