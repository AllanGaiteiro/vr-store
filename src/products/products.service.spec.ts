import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Repository<Product>;

  const mockProductRepository = {
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
    repository = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1, description: 'Test Product' } as Product];
      mockProductRepository.find.mockResolvedValue(result);

      expect(await service.findAll()).toBe(result);
      expect(mockProductRepository.find).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = { description: 'New Product', cost: 20 };
      const savedProduct = { id: 1, ...createProductDto } as Product;
      mockProductRepository.save.mockResolvedValue(savedProduct);

      expect(await service.create(createProductDto)).toBe(savedProduct);
      expect(mockProductRepository.save).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await service.remove(1);
      expect(mockProductRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
