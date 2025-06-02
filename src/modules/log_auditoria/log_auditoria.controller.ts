import { Controller } from '@nestjs/common';
import { LogAuditoriaService } from './log_auditoria.service';

@Controller('log-auditoria')
export class LogAuditoriaController {
  constructor(private readonly logAuditoriaService: LogAuditoriaService) {}
}
