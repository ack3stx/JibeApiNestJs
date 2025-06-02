import { PartialType } from '@nestjs/mapped-types';
import { CreateClaseDepartamentoSubsidiariaDto } from './create-clase_departamento_subsidiaria.dto';

export class UpdateClaseDepartamentoSubsidiariaDto extends PartialType(CreateClaseDepartamentoSubsidiariaDto) {}
