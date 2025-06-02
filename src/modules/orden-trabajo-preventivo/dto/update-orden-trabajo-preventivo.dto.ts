import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdenTrabajoPreventivoDto } from './create-orden-trabajo-preventivo.dto';

export class UpdateOrdenTrabajoPreventivoDto extends PartialType(CreateOrdenTrabajoPreventivoDto) {}
