import { Controller, HttpCode,Get,UseGuards, Request, Post } from '@nestjs/common';
import { OrdenTrabajoService } from './orden-trabajo.service';
import { UserGuard } from 'src/auth/guards/UserGuard.guard';
import { RoleGuard } from 'src/auth/guards/role/role.guard';

@Controller('orden-trabajo')
export class OrdenTrabajoController {
  constructor(private readonly ordenTrabajoService: OrdenTrabajoService) {}

  @Get('Gerencia')
  @HttpCode(200)
  @UseGuards(UserGuard,RoleGuard)
  async getNotificacionesAdmin(@Request() req) {
    return this.ordenTrabajoService.findAllOrdenesDeTrabajoForGerente();
  }  

  @Post('Gerencia')
  @HttpCode(200)
  @UseGuards(UserGuard,RoleGuard)
  async createOrdenDeTrabajo(@Request() req) {
    return this.ordenTrabajoService.NewOrdernTrabajo(req.body);
  }

}
