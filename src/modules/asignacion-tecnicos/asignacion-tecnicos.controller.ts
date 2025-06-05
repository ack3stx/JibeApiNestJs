import { Controller } from '@nestjs/common';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';
import { Post, Body,Get } from '@nestjs/common';
import { asignacion_tecnicos } from './entities/Asignacion_Tecnicos.entity';
import { AsignacionTecnicosBatchDto } from './dto/TecnicoAsignado.dto';
import { Param } from '@nestjs/common';

@Controller('asignacion-tecnicos')
export class AsignacionTecnicosController {
  constructor(private readonly asignacionTecnicosService: AsignacionTecnicosService) {}

  @Post()
  async procesarAsignaciones(@Body() data: AsignacionTecnicosBatchDto): Promise<asignacion_tecnicos[]> {
    return this.asignacionTecnicosService.procesarAsignacionesTecnicos(data);
  }

  @Get('orden/:id')
  async findByOrden(@Param('id') ordenId: number): Promise<any[]> {
      return this.asignacionTecnicosService.findByOrdenTrabajo(ordenId);
  }

}

