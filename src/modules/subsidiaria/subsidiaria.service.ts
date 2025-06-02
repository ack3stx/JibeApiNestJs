import { Injectable } from '@nestjs/common';
import { CreateSubsidiariaDto } from './dto/create-subsidiaria.dto';
import { UpdateSubsidiariaDto } from './dto/update-subsidiaria.dto';
import { Subsidiaria } from './entities/subsidiaria.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SubsidiariaService {
  
  constructor(
    @InjectRepository(Subsidiaria)
    private readonly subsidiariaRepository: Repository<Subsidiaria>
  ) {}

  async FIndAllSubsidiarias() {
    return this.subsidiariaRepository.find({
      order: {
        nombre: 'ASC'
      }
    });
  }
}
