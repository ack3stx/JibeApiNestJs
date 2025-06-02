import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import { Departamentos } from './entities/departamento.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepartamentoService {
  constructor(
    @InjectRepository(Departamentos)
    private readonly departamentosRepository: Repository<Departamentos>,
  ) {}

  create(createDepartamentoDto: CreateDepartamentoDto) {
    return 'This action adds a new departamento';
  }

  async FIndAllDepartamentos() {
        return this.departamentosRepository.find({
            order: {
                nombre: 'ASC'
            }
        });
    }

  findOne(id: number) {
    return `This action returns a #${id} departamento`;
  }

  update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    return `This action updates a #${id} departamento`;
  }

  remove(id: number) {
    return `This action removes a #${id} departamento`;
  }
}
