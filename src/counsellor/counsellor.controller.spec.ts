import { Test, TestingModule } from '@nestjs/testing';
import { CounsellorController } from './counsellor.controller';
import { CounsellorService } from './counsellor.service';

describe('CounsellorController', () => {
  let controller: CounsellorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CounsellorController],
      providers: [CounsellorService],
    }).compile();

    controller = module.get<CounsellorController>(CounsellorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
