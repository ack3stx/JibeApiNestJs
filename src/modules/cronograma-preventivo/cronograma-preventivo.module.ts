import { Module } from '@nestjs/common';
import { CronogramaPreventivoService } from './cronograma-preventivo.service';
import { CronogramaPreventivoController } from './cronograma-preventivo.controller';

@Module({
  controllers: [CronogramaPreventivoController],
  providers: [CronogramaPreventivoService],
})
export class CronogramaPreventivoModule {}
