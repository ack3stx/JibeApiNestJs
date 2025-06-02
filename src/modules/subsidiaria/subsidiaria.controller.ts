import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubsidiariaService } from './subsidiaria.service';
import { CreateSubsidiariaDto } from './dto/create-subsidiaria.dto';
import { UpdateSubsidiariaDto } from './dto/update-subsidiaria.dto';

@Controller('subsidiaria')
export class SubsidiariaController {
  constructor(private readonly subsidiariaService: SubsidiariaService) {}

  @Get()
  findAll() {
    return this.subsidiariaService.FIndAllSubsidiarias();
  }
}
