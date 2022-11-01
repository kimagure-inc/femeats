import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma.service';
import { CategoriesService } from './categories.service';

describe('Get Category', () => {
  let service: CategoriesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService, PrismaService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should get one category', async () => {
    prisma.category.findUnique = jest.fn().mockImplementation((id) => {
      const input = id.where.id;
      const array = [
        { id: 1, name: 'Balance' },
        { id: 2, name: 'Beauty' },
        { id: 3, name: 'Relax' },
        { id: 4, name: 'Energy' },
      ];

      for (let i = 0; i < array.length - 1; i++) {
        if (array[i].id === input) {
          return array[i];
        }
      }
    });

    expect(await service.category(1)).toStrictEqual({ id: 1, name: 'Balance' });
  });
});
