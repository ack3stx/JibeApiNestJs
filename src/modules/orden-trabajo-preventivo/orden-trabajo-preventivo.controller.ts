import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdenTrabajoPreventivoService } from './orden-trabajo-preventivo.service';
import { CreateOrdenTrabajoPreventivoDto } from './dto/create-orden-trabajo-preventivo.dto';
import { UpdateOrdenTrabajoPreventivoDto } from './dto/update-orden-trabajo-preventivo.dto';

@Controller('orden-trabajo-preventivo')
export class OrdenTrabajoPreventivoController {
  constructor(private readonly ordenTrabajoPreventivoService: OrdenTrabajoPreventivoService) {}

  @Post()
  create(@Body() createOrdenTrabajoPreventivoDto: CreateOrdenTrabajoPreventivoDto) {
    return this.ordenTrabajoPreventivoService.create(createOrdenTrabajoPreventivoDto);
  }

  @Get()
  findAll() {
    return this.ordenTrabajoPreventivoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordenTrabajoPreventivoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdenTrabajoPreventivoDto: UpdateOrdenTrabajoPreventivoDto) {
    return this.ordenTrabajoPreventivoService.update(+id, updateOrdenTrabajoPreventivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordenTrabajoPreventivoService.remove(+id);
  }
}
