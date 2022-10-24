import { Test, TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { PersonalizeService } from './personalize.service';
import { PersonalizeController } from './personalize.controller';

describe('AppController', () => {
  let personalizeController: PersonalizeController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PersonalizeController],
      providers: [PersonalizeService],
    }).compile();

    personalizeController = app.get<PersonalizeController>(
      PersonalizeController,
    );
  });

  const testAnswer = [
    [3, 2, 3, 3, 3],
    [3, 3, 4, 3, 3],
    [3, 3, 3, 4, 3],
    [4, 3, 3, 3, 4],
  ];

  const testDecideLabel = [1, 2, 3, 4];

  describe('/personalize', () => {
    it('should return one label', () => {
      for (let i = 0; i < testAnswer.length - 1; i++) {
        expect(personalizeController.create({ data: testAnswer[i] })).toBe(
          testDecideLabel[i],
        );
      }
    });
  });
});
