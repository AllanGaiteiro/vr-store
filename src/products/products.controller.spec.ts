import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    findAll: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = [{ id: 1, description: 'Test Product' } as Product];
      mockProductService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockProductService.findAll).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create and return a product', async () => {
      const createProductDto: CreateProductDto = {
        description: 'New Product',
        cost: 30,
      };
      const savedProduct = { id: 1, ...createProductDto } as Product;
      mockProductService.create.mockResolvedValue(savedProduct);

      expect(await controller.create(createProductDto)).toBe(savedProduct);
      expect(mockProductService.create).toHaveBeenCalledWith(createProductDto);
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      await controller.remove(1);
      expect(mockProductService.remove).toHaveBeenCalledWith(1);
    });
  });
});
