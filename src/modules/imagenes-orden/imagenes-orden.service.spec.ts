import { Test, TestingModule } from '@nestjs/testing';
import { ImagenesOrdenService } from './imagenes-orden.service';

describe('ImagenesOrdenService', () => {
  let service: ImagenesOrdenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImagenesOrdenService],
    }).compile();

    service = module.get<ImagenesOrdenService>(ImagenesOrdenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
