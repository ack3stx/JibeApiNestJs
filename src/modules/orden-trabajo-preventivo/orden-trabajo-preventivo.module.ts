import { Module } from '@nestjs/common';
import { OrdenTrabajoPreventivoService } from './orden-trabajo-preventivo.service';
import { OrdenTrabajoPreventivoController } from './orden-trabajo-preventivo.controller';

@Module({
  controllers: [OrdenTrabajoPreventivoController],
  providers: [OrdenTrabajoPreventivoService],
})
export class OrdenTrabajoPreventivoModule {}
