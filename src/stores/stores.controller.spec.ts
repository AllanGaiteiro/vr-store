import { Test, TestingModule } from '@nestjs/testing';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { NotFoundException } from '@nestjs/common';

describe('StoresController', () => {
  let controller: StoresController;

  const mockStoreService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StoresController],
      providers: [
        {
          provide: StoresService,
          useValue: mockStoreService,
        },
      ],
    }).compile();

    controller = module.get<StoresController>(StoresController);
  });

  describe('findAll', () => {
    it('should return an array of stores', async () => {
      const result = [{ id: 1, name: 'Test Store' }];
      mockStoreService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
      expect(mockStoreService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a store if it exists', async () => {
      const store = { id: 1, name: 'Test Store' };
      mockStoreService.findOne.mockResolvedValue(store);

      expect(await controller.findOne(1)).toBe(store);
      expect(mockStoreService.findOne).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a store', async () => {
      const createStoreDto: CreateStoreDto = { description: 'Test Store' };
      const savedStore = { id: 1, ...createStoreDto };
      mockStoreService.create.mockResolvedValue(savedStore);

      expect(await controller.create(createStoreDto)).toBe(savedStore);
      expect(mockStoreService.create).toHaveBeenCalledWith(createStoreDto);
    });
  });

  describe('update', () => {
    it('should update and return the store', async () => {
      const store = { id: 1, description: 'Test Store' };
      const updateStoreDto: UpdateStoreDto = { description: 'Updated Store' };
      mockStoreService.update.mockResolvedValue({
        ...store,
        ...updateStoreDto,
      });

      expect(await controller.update(1, updateStoreDto)).toEqual({
        ...store,
        ...updateStoreDto,
      });
      expect(mockStoreService.update).toHaveBeenCalledWith(1, updateStoreDto);
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the store', async () => {
      mockStoreService.remove.mockResolvedValue(undefined);

      await controller.remove(1);
      expect(mockStoreService.remove).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
