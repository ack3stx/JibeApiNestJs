import { Module } from '@nestjs/common';
import { DepartamentoService } from './departamento.service';
import { DepartamentoController } from './departamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamentos } from './entities/departamento.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Departamentos]) // Specify the entities related to Departamento here
  ],
  controllers: [DepartamentoController],
  providers: [DepartamentoService],
})
export class DepartamentoModule {}
