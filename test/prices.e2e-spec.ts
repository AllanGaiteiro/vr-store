import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Price } from '../src/prices/price.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../src/products/product.entity';
import { Store } from '../src/stores/store.entity';

describe('PricesController (E2E)', () => {
  let app: INestApplication;

  const mockQueryBuilder = {
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    andWhere: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    orderBy: jest.fn().mockReturnThis(),
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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Price))
      .useValue(mockPriceRepository)
      .overrideProvider(getRepositoryToken(Product))
      .useValue(mockProductRepository)
      .overrideProvider(getRepositoryToken(Store))
      .useValue(mockStoreRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/prices (GET)', async () => {
    const result = [{ id: 1, priceValue: 100 }];
    mockPriceRepository.find.mockResolvedValue(result);

    const response = await request(app.getHttpServer())
      .get('/prices')
      .expect(200);

    expect(response.body).toEqual(result);
  });

  it('/prices (POST) - successful creation', async () => {
    const createPriceDto = { productId: 1, storeId: 1, priceValue: 100 };
    const savedPrice = { id: 1, ...createPriceDto };

    mockProductRepository.findOne.mockResolvedValue({ id: 1 }); // Mock do produto existente
    mockStoreRepository.findOne.mockResolvedValue({ id: 1 }); // Mock da loja existente
    mockPriceRepository.save.mockResolvedValue(savedPrice);

    const response = await request(app.getHttpServer())
      .post('/prices')
      .send(createPriceDto)
      .expect(201);

    expect(response.body).toEqual(savedPrice);
  });

  it('/prices (POST) - product not found', async () => {
    const createPriceDto = { productId: 999, storeId: 1, priceValue: 100 };

    mockProductRepository.findOne.mockResolvedValue(null); // Produto não encontrado
    mockStoreRepository.findOne.mockResolvedValue({ id: 1 });

    const response = await request(app.getHttpServer())
      .post('/prices')
      .send(createPriceDto)
      .expect(404);

    expect(response.body.message).toEqual('Product with ID 999 not found');
  });

  it('/prices (POST) - store not found', async () => {
    const createPriceDto = { productId: 1, storeId: 999, priceValue: 100 };

    mockProductRepository.findOne.mockResolvedValue({ id: 1 });
    mockStoreRepository.findOne.mockResolvedValue(null); // Loja não encontrada

    const response = await request(app.getHttpServer())
      .post('/prices')
      .send(createPriceDto)
      .expect(404);

    expect(response.body.message).toEqual('Store with ID 999 not found');
  });

  it('/prices/:id (GET)', async () => {
    const price = { id: 1, priceValue: 100 };
    mockPriceRepository.findOne.mockResolvedValue(price);

    const response = await request(app.getHttpServer())
      .get('/prices/1')
      .expect(200);

    expect(response.body).toEqual(price);
  });

  it('/prices/:id (GET) - price not found', async () => {
    mockPriceRepository.findOne.mockResolvedValue(null); // Preço não encontrado

    const response = await request(app.getHttpServer())
      .get('/prices/999')
      .expect(404);

    expect(response.body.message).toEqual('Price with ID 999 not found');
  });

  it('/prices/:id (DELETE)', async () => {
    mockPriceRepository.delete.mockResolvedValue({ affected: 1 });

    await request(app.getHttpServer()).delete('/prices/1').expect(204);
  });

  it('/prices/:id (DELETE) - price not found', async () => {
    mockPriceRepository.delete.mockResolvedValue({ affected: 0 }); // Preço não encontrado

    const response = await request(app.getHttpServer())
      .delete('/prices/999')
      .expect(404);

    expect(response.body.message).toEqual('Price with ID 999 not found');
  });
});
