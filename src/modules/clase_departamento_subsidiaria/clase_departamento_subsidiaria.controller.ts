import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClaseDepartamentoSubsidiariaService } from './clase_departamento_subsidiaria.service';
import { CreateClaseDepartamentoSubsidiariaDto } from './dto/create-clase_departamento_subsidiaria.dto';
import { UpdateClaseDepartamentoSubsidiariaDto } from './dto/update-clase_departamento_subsidiaria.dto';

@Controller('clase-departamento-subsidiaria')
export class ClaseDepartamentoSubsidiariaController {
  constructor(private readonly claseDepartamentoSubsidiariaService: ClaseDepartamentoSubsidiariaService) {}

  @Post()
  create(@Body() createClaseDepartamentoSubsidiariaDto: CreateClaseDepartamentoSubsidiariaDto) {
    return this.claseDepartamentoSubsidiariaService.create(createClaseDepartamentoSubsidiariaDto);
  }

  @Get()
  findAll() {
    return this.claseDepartamentoSubsidiariaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.claseDepartamentoSubsidiariaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClaseDepartamentoSubsidiariaDto: UpdateClaseDepartamentoSubsidiariaDto) {
    return this.claseDepartamentoSubsidiariaService.update(+id, updateClaseDepartamentoSubsidiariaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.claseDepartamentoSubsidiariaService.remove(+id);
  }
}
