import { Controller } from '@nestjs/common';
import { CronogramaPreventivoService } from './cronograma-preventivo.service';

@Controller('cronograma-preventivo')
export class CronogramaPreventivoController {
  constructor(private readonly cronogramaPreventivoService: CronogramaPreventivoService) {}
}
