import { Test, TestingModule } from '@nestjs/testing';
import { PricesController } from './prices.controller';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';
import { NotFoundException } from '@nestjs/common';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('PricesController', () => {
  let controller: PricesController;

  const mockPriceService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  const mockProductRepository = {
    findOne: jest.fn(),
  };

  const mockStoreRepository = {
    findOne: jest.fn(),
  };

  const mockPriceRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PricesController],
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
        {
          provide: PricesService,
          useValue: mockPriceService,
        },
      ],
    }).compile();

    controller = module.get<PricesController>(PricesController);
  });

  describe('findAll', () => {
    it('should return an array of prices', async () => {
      const result = [{ id: 1, priceValue: 100 }] as Price[];
      mockPriceService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockPriceService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a price by id', async () => {
      const price = { id: 1, priceValue: 100 } as Price;
      mockPriceService.findOne.mockResolvedValue(price);

      expect(await controller.findOne(1)).toBe(price);
      expect(mockPriceService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if price not found', async () => {
      mockPriceService.findOne.mockResolvedValue(null);

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
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

      mockPriceService.create.mockResolvedValue(savedPrice);

      expect(await controller.create(createPriceDto)).toBe(savedPrice);
      expect(mockPriceService.create).toHaveBeenCalledWith(createPriceDto);
    });
  });

  describe('update', () => {
    it('should update and return a price', async () => {
      const updatePriceDto: UpdatePriceDto = { priceValue: 120 };
      const updatedPrice = { id: 1, priceValue: 120 } as Price;
      mockPriceService.update.mockResolvedValue(updatedPrice);

      expect(await controller.update(1, updatePriceDto)).toEqual(updatedPrice);
      expect(mockPriceService.update).toHaveBeenCalledWith(1, updatePriceDto);
    });
  });

  describe('remove', () => {
    it('should remove a price', async () => {
      mockPriceService.remove.mockResolvedValue(undefined);

      await controller.remove(1);
      expect(mockPriceService.remove).toHaveBeenCalledWith(1);
    });
  });
});
