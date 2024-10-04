import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
    getManyAndCount: jest
      .fn()
      .mockResolvedValue([[{ cost: 20, description: 'New Product' }], 1]),
    getMany: jest
      .fn()
      .mockResolvedValue([{ cost: 20, description: 'New Product' }]),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  };

  const mockProductRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    find: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = {
        data: [{ cost: 20, description: 'New Product' }],
        length: 1,
        limit: 1,
        page: 0,
      };
      mockProductRepository.find.mockResolvedValue(result);

      expect({ ...(await service.findAll()) }).toStrictEqual(result);
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        description: 'New Product',
        cost: 20,
      };
      const savedProduct = { id: 1, ...createProductDto } as Product;
      mockProductRepository.save.mockResolvedValue(savedProduct);

      expect(await service.create(createProductDto)).toBe(savedProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await service.remove(1);
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
