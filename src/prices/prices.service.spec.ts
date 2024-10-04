import { Test, TestingModule } from '@nestjs/testing';
import { PricesService } from './prices.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Store } from '../stores/store.entity';
import { Product } from '../products/product.entity'; // Teste esta importação

import { NotFoundException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

describe('PricesService', () => {
  let service: PricesService;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    getManyAndCount: jest
      .fn()
      .mockResolvedValue([[{ id: 1, priceValue: 100 }], 1]),
    getMany: jest.fn().mockResolvedValue([{ id: 1, priceValue: 100 }]),
    skip: jest.fn().mockReturnThis(),
    take: jest.fn().mockReturnThis(),
  };

  const mockPriceRepository = {
    createQueryBuilder: jest.fn(() => mockQueryBuilder),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  const mockProductRepository = {
    findOne: jest.fn(),
  };

  const mockStoreRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PricesService,
        {
          provide: getRepositoryToken(Price),
          useValue: mockPriceRepository,
        },
        {
          provide: getRepositoryToken(Product),
          useValue: mockProductRepository,
        },
        {
          provide: getRepositoryToken(Store),
          useValue: mockStoreRepository,
        },
      ],
    }).compile();

    service = module.get<PricesService>(PricesService);
  });

  describe('create', () => {
    it('should create and return a price', async () => {
      const createPriceDto: CreatePriceDto = {
        productId: 1,
        storeId: 1,
        priceValue: 100,
      };
      const product = { id: 1, description: 'Test Product' } as Product;
      const store = { id: 1, description: 'Test Store' } as Store;
      const savedPrice = {
        priceValue: createPriceDto.priceValue,
        product,
        store,
      } as Price;

      mockProductRepository.findOne.mockResolvedValue(product);
      mockStoreRepository.findOne.mockResolvedValue(store);
      mockPriceRepository.create.mockReturnValue(savedPrice);
      mockPriceRepository.save.mockResolvedValue(savedPrice);

      expect(await service.create(createPriceDto)).toBe(savedPrice);
      expect(mockProductRepository.findOne).toHaveBeenCalledWith({
        where: { id: createPriceDto.productId },
      });
      expect(mockStoreRepository.findOne).toHaveBeenCalledWith({
        where: { id: createPriceDto.storeId },
      });
      expect(mockPriceRepository.save).toHaveBeenCalledWith(savedPrice);
    });

    it('should throw NotFoundException if product not found', async () => {
      const createPriceDto: CreatePriceDto = {
        productId: 1,
        storeId: 1,
        priceValue: 100,
      };
      mockProductRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createPriceDto)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should throw NotFoundException if store not found', async () => {
      const createPriceDto: CreatePriceDto = {
        productId: 1,
        storeId: 1,
        priceValue: 100,
      };
      const product = { id: 1, description: 'Test Product' } as Product;
      mockProductRepository.findOne.mockResolvedValue(product);
      mockStoreRepository.findOne.mockResolvedValue(null);

      await expect(service.create(createPriceDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of prices', async () => {
      const result = {
        data: [{ id: 1, priceValue: 100 }],
        length: 1,
        limit: 1,
        page: 0,
      };
      mockPriceRepository.find.mockResolvedValue(result);
      expect(await service.findAll()).toStrictEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a price by id', async () => {
      const price = { id: 1, priceValue: 100 } as Price;
      mockPriceRepository.findOne.mockResolvedValue(price);

      expect(await service.findOne(1)).toStrictEqual(price);
      expect(mockPriceRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: ['product', 'store'],
      });
    });

    it('should throw NotFoundException if price not found', async () => {
      mockPriceRepository.findOne.mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return a price', async () => {
      const updatePriceDto: UpdatePriceDto = { priceValue: 120 };
      const price = { id: 1, priceValue: 100 } as Price;
      mockPriceRepository.findOne.mockResolvedValue(price);
      mockPriceRepository.update.mockResolvedValue(undefined);
      mockPriceRepository.findOne.mockResolvedValue({
        ...price,
        ...updatePriceDto,
      });

      expect(await service.update(1, updatePriceDto)).toEqual({
        ...price,
        ...updatePriceDto,
      });
      expect(mockPriceRepository.update).toHaveBeenCalledWith(
        1,
        updatePriceDto,
      );
    });

    it('should throw NotFoundException if price not found', async () => {
      const updatePriceDto: UpdatePriceDto = { priceValue: 120 };
      mockPriceRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, updatePriceDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a price', async () => {
      mockPriceRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockPriceRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if price not found', async () => {
      mockPriceRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
