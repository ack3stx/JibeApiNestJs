import { PartialType } from '@nestjs/mapped-types';
import { CreateSubsidiariaDto } from './create-subsidiaria.dto';

export class UpdateSubsidiariaDto extends PartialType(CreateSubsidiariaDto) {}
