import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesOrdenController } from './imagenes-orden.controller';
import { ImagenesOrdenService } from './imagenes-orden.service';

describe('ImagenesOrdenController', () => {
  let controller: ImagenesOrdenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImagenesOrdenController],
      providers: [ImagenesOrdenService],
    }).compile();

    controller = module.get<ImagenesOrdenController>(ImagenesOrdenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
