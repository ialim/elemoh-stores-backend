import { Test, TestingModule } from '@nestjs/testing';
import { FacetsService } from './facets.service';

describe('FacetsService', () => {
  let service: FacetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FacetsService],
    }).compile();

    service = module.get<FacetsService>(FacetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
