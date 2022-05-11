import { Test, TestingModule } from '@nestjs/testing';
import { TerraService } from './terra.service';

describe('TerraService', () => {
  let service: TerraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TerraService],
    }).compile();

    service = module.get<TerraService>(TerraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
