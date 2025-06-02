import { Test, TestingModule } from '@nestjs/testing';
import { OrdenTrabajoPreventivoController } from './orden-trabajo-preventivo.controller';
import { OrdenTrabajoPreventivoService } from './orden-trabajo-preventivo.service';

describe('OrdenTrabajoPreventivoController', () => {
  let controller: OrdenTrabajoPreventivoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdenTrabajoPreventivoController],
      providers: [OrdenTrabajoPreventivoService],
    }).compile();

    controller = module.get<OrdenTrabajoPreventivoController>(OrdenTrabajoPreventivoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
