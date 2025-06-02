import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { TecnicosService } from './tecnicos.service';
import { UserGuard } from 'src/auth/guards/UserGuard.guard';
import { UseGuards } from '@nestjs/common';
@Controller('tecnicos')
export class TecnicosController {
  constructor(private readonly tecnicosService: TecnicosService) {}

  
  @Get()
  @HttpCode(200)
  async buscarTecnicos() {
    return await this.tecnicosService.buscarTecnicos();
  }

  @Get('asignados')
  @UseGuards(UserGuard)
  @HttpCode(200)
  async obtenerMisOrdenes(@Req() req) {
        const userId = req.user.id;
        return this.tecnicosService.obtenerOrdenesPorUsuarioSesion(userId);
    }

}
