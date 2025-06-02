import { Module } from '@nestjs/common';
import { OrdenTrabajoService } from './orden-trabajo.service';
import { OrdenTrabajoController } from './orden-trabajo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdenTrabajo } from './entities/orden-trabajo.entity';
import { Notificaciones } from '../notificaciones/entities/notificacion.entity';
import { tecnicos } from '../tecnicos/entities/tecnicos.entity';
import { asignacion_tecnicos } from '../asignacion-tecnicos/entities/Asignacion_Tecnicos.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdenTrabajo,Notificaciones, tecnicos, asignacion_tecnicos
    ]),
  ],
  controllers: [OrdenTrabajoController],
  providers: [OrdenTrabajoService],
})
export class OrdenTrabajoModule {}
