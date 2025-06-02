import { Injectable } from '@nestjs/common';
import { CreateClaseDepartamentoSubsidiariaDto } from './dto/create-clase_departamento_subsidiaria.dto';
import { UpdateClaseDepartamentoSubsidiariaDto } from './dto/update-clase_departamento_subsidiaria.dto';

@Injectable()
export class ClaseDepartamentoSubsidiariaService {
  create(createClaseDepartamentoSubsidiariaDto: CreateClaseDepartamentoSubsidiariaDto) {
    return 'This action adds a new claseDepartamentoSubsidiaria';
  }

  findAll() {
    return `This action returns all claseDepartamentoSubsidiaria`;
  }

  findOne(id: number) {
    return `This action returns a #${id} claseDepartamentoSubsidiaria`;
  }

  update(id: number, updateClaseDepartamentoSubsidiariaDto: UpdateClaseDepartamentoSubsidiariaDto) {
    return `This action updates a #${id} claseDepartamentoSubsidiaria`;
  }

  remove(id: number) {
    return `This action removes a #${id} claseDepartamentoSubsidiaria`;
  }
}
