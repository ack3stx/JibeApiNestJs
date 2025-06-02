import { Injectable } from '@nestjs/common';
import { CreateOrdenTrabajoPreventivoDto } from './dto/create-orden-trabajo-preventivo.dto';
import { UpdateOrdenTrabajoPreventivoDto } from './dto/update-orden-trabajo-preventivo.dto';

@Injectable()
export class OrdenTrabajoPreventivoService {
  create(createOrdenTrabajoPreventivoDto: CreateOrdenTrabajoPreventivoDto) {
    return 'This action adds a new ordenTrabajoPreventivo';
  }

  findAll() {
    return `This action returns all ordenTrabajoPreventivo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordenTrabajoPreventivo`;
  }

  update(id: number, updateOrdenTrabajoPreventivoDto: UpdateOrdenTrabajoPreventivoDto) {
    return `This action updates a #${id} ordenTrabajoPreventivo`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordenTrabajoPreventivo`;
  }
}
