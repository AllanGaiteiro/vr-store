import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Product } from '../src/products/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ProductsController (E2E)', () => {
  let app: INestApplication;

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

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Product))
      .useValue(mockProductRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/products (GET)', async () => {
    const result = [{ id: 1, name: 'Product 1' }];
    mockProductRepository.find.mockResolvedValue(result);

    const response = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(response.body).toEqual(result);
  });

  it('/products (POST) - successful creation', async () => {
    const createProductDto = {
      name: 'Product 1',
      description: 'Description 1',
    };
    const savedProduct = { id: 1, ...createProductDto };

    mockProductRepository.save.mockResolvedValue(savedProduct);

    const response = await request(app.getHttpServer())
      .post('/products')
      .send(createProductDto)
      .expect(201);

    expect(response.body).toEqual(savedProduct);
  });

  it('/products/:id (DELETE)', async () => {
    mockProductRepository.delete.mockResolvedValue({ affected: 1 });

    await request(app.getHttpServer()).delete('/products/1').expect(204);
  });

  it('/products/:id (DELETE) - product not found', async () => {
    mockProductRepository.delete.mockResolvedValue({ affected: 0 }); // Produto não encontrado

    const response = await request(app.getHttpServer())
      .delete('/products/999')
      .expect(404);

    expect(response.body.message).toEqual('Product with ID 999 not found');
  });
});
