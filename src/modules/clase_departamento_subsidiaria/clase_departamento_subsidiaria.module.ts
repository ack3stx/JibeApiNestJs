import { Module } from '@nestjs/common';
import { ClaseDepartamentoSubsidiariaService } from './clase_departamento_subsidiaria.service';
import { ClaseDepartamentoSubsidiariaController } from './clase_departamento_subsidiaria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClaseDepartamentoSubsidiaria } from './entities/clase_departamento_subsidiaria.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ClaseDepartamentoSubsidiaria])
  ],
  controllers: [ClaseDepartamentoSubsidiariaController],
  providers: [ClaseDepartamentoSubsidiariaService],
})
export class ClaseDepartamentoSubsidiariaModule {}
