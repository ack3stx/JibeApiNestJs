import { Module } from '@nestjs/common';
import { ImagenesOrdenService } from './imagenes-orden.service';
import { ImagenesOrdenController } from './imagenes-orden.controller';

@Module({
  controllers: [ImagenesOrdenController],
  providers: [ImagenesOrdenService],
})
export class ImagenesOrdenModule {}
