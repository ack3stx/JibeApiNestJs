import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { NotificacionesService } from './notificaciones.service';
import { NotificacionesController } from './notificaciones.controller';
import { Notificaciones } from './entities/notificacion.entity';
import { JwtStrategy } from '../../auth/strategies/jwt.strategy';
import * as dotenv from 'dotenv';
import { ClaseDepartamentoSubsidiaria } from '../clase_departamento_subsidiaria/entities/clase_departamento_subsidiaria.entity';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([Notificaciones,ClaseDepartamentoSubsidiaria]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [NotificacionesController],
  providers: [NotificacionesService, JwtStrategy], // Add JwtStrategy here
})
export class NotificacionesModule {}