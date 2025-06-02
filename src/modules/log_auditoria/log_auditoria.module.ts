import { Module } from '@nestjs/common';
import { LogAuditoriaService } from './log_auditoria.service';
import { LogAuditoriaController } from './log_auditoria.controller';

@Module({
  controllers: [LogAuditoriaController],
  providers: [LogAuditoriaService],
})
export class LogAuditoriaModule {}
