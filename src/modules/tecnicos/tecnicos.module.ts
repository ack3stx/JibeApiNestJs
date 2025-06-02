import { Module } from '@nestjs/common';
import { TecnicosService } from './tecnicos.service';
import { TecnicosController } from './tecnicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { tecnicos } from './entities/tecnicos.entity';
import { User } from '../users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { asignacion_tecnicos } from '../asignacion-tecnicos/entities/Asignacion_Tecnicos.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([tecnicos,User,asignacion_tecnicos]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [TecnicosController],
  providers: [TecnicosService],
})
export class TecnicosModule {}
