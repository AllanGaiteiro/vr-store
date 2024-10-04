import { Test, TestingModule } from '@nestjs/testing';
import { StoresService } from './stores.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { NotFoundException } from '@nestjs/common';

describe('StoresService', () => {
  let service: StoresService;

  const mockStoreRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StoresService,
        {
          provide: getRepositoryToken(Store),
          useValue: mockStoreRepository,
        },
      ],
    }).compile();

    service = module.get<StoresService>(StoresService);
  });

  describe('create', () => {
    it('should create and return a store', async () => {
      const createStoreDto: CreateStoreDto = { description: 'Test Store' };
      const savedStore = { id: 1, ...createStoreDto };

      mockStoreRepository.save.mockResolvedValue(savedStore);

      expect(await service.create(createStoreDto)).toBe(savedStore);
      expect(mockStoreRepository.save).toHaveBeenCalledWith(createStoreDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of stores', async () => {
      const storeArray = [{ id: 1, name: 'Test Store' }];
      mockStoreRepository.find.mockResolvedValue(storeArray);

      const result = await service.findAll();
      expect(result).toEqual(storeArray);
      expect(mockStoreRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a store if it exists', async () => {
      const store = { id: 1, name: 'Test Store' };
      mockStoreRepository.findOne.mockResolvedValue(store);

      const result = await service.findOne(1);
      expect(result).toEqual(store);
      expect(mockStoreRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the store', async () => {
      const store = { id: 1, description: 'Test Store' };
      const updateStoreDto: UpdateStoreDto = { description: 'Updated Store' };
      mockStoreRepository.findOne.mockResolvedValue(store);
      mockStoreRepository.update.mockResolvedValue(undefined);
      mockStoreRepository.findOne.mockResolvedValue({
        ...store,
        ...updateStoreDto,
      });

      const result = await service.update(1, updateStoreDto);
      expect(result).toEqual({ ...store, ...updateStoreDto });
      expect(mockStoreRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockStoreRepository.update).toHaveBeenCalledWith(
        1,
        updateStoreDto,
      );
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreRepository.findOne.mockResolvedValue(null);

      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should remove the store', async () => {
      mockStoreRepository.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockStoreRepository.delete).toHaveBeenCalledWith(1);
    });

    it('should throw a NotFoundException if the store does not exist', async () => {
      mockStoreRepository.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
