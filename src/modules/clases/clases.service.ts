import { Injectable } from '@nestjs/common';
import { CreateClaseDto } from './dto/create-clase.dto';
import { UpdateClaseDto } from './dto/update-clase.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { clases } from './entities/clase.entity';

@Injectable()
export class ClasesService {
  constructor(
    @InjectRepository(clases)
    private readonly clasesRepository: Repository<clases>,
  ) {}
  create(createClaseDto: CreateClaseDto) {
    return 'This action adds a new clase';
  }

  async FIndAllClases() {
        return this.clasesRepository.find({
            order: {
                nombre: 'ASC'
            }
        });
    }

  
}
