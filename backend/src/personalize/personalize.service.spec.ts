import { Test, TestingModule } from '@nestjs/testing';
import { PersonalizeService } from './personalize.service';

describe('AppService', () => {
  let service: PersonalizeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalizeService],
    }).compile();

    service = module.get<PersonalizeService>(PersonalizeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const testAnswer = [
    [3, 2, 3, 3, 3],
    [3, 3, 4, 3, 3],
    [3, 3, 3, 4, 3],
    [4, 3, 3, 3, 4],
  ];

  const testDecideLabel = [1, 2, 3, 4];

  describe('create', () => {
    it('should have deletePassword removed', () => {
      for (let i = 0; i < testAnswer.length - 1; i++) {
        const decideLabel = service.create({ data: testAnswer[i] });
        expect(decideLabel).toBe(testDecideLabel[i]);
      }
    });
  });
});
