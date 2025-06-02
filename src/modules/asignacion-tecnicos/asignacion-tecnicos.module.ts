import { Module } from '@nestjs/common';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';
import { AsignacionTecnicosController } from './asignacion-tecnicos.controller';

@Module({
  controllers: [AsignacionTecnicosController],
  providers: [AsignacionTecnicosService],
})
export class AsignacionTecnicosModule {}
