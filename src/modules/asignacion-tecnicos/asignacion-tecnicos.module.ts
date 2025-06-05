import { Module } from '@nestjs/common';
import { AsignacionTecnicosService } from './asignacion-tecnicos.service';
import { AsignacionTecnicosController } from './asignacion-tecnicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { asignacion_tecnicos } from './entities/Asignacion_Tecnicos.entity';

@Module({

  imports: [TypeOrmModule.forFeature([asignacion_tecnicos])],
  controllers: [AsignacionTecnicosController],
  providers: [AsignacionTecnicosService],
})
export class AsignacionTecnicosModule {
}
