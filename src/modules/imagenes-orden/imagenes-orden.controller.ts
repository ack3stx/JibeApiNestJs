import { Controller } from '@nestjs/common';
import { ImagenesOrdenService } from './imagenes-orden.service';

@Controller('imagenes-orden')
export class ImagenesOrdenController {
  constructor(private readonly imagenesOrdenService: ImagenesOrdenService) {}
}
