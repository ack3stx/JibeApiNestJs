import { Module } from '@nestjs/common';
import { SubsidiariaService } from './subsidiaria.service';
import { SubsidiariaController } from './subsidiaria.controller';
import { Subsidiaria } from './entities/subsidiaria.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([Subsidiaria])],
  
  controllers: [SubsidiariaController],
  providers: [SubsidiariaService],
})
export class SubsidiariaModule {}
