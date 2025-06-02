import { Controller } from '@nestjs/common';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';

@Controller('asignacion-tecnicos')
export class AsignacionTecnicosController {
  constructor(private readonly asignacionTecnicosService: AsignacionTecnicosService) {}
}
