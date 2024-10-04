import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Store } from '../src/stores/store.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateStoreDto } from '../src/stores/dto/create-store.dto';

describe('StoresController (E2E)', () => {
  let app: INestApplication;

  const mockStoreRepository = {
    find: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(getRepositoryToken(Store))
      .useValue(mockStoreRepository)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/stores (GET)', async () => {
    const result = [{ id: 1, name: 'Store 1' }];
    mockStoreRepository.find.mockResolvedValue(result);

    const response = await request(app.getHttpServer())
      .get('/stores')
      .expect(200);

    expect(response.body).toEqual(result);
  });

  it('/stores (POST) - successful creation', async () => {
    const createStoreDto: CreateStoreDto = { description: 'Store 1' };
    const savedStore = { id: 1, ...createStoreDto };
    mockStoreRepository.save.mockResolvedValue(savedStore);

    const response = await request(app.getHttpServer())
      .post('/stores')
      .send(createStoreDto)
      .expect(201);

    expect(response.body).toEqual(savedStore);
  });

  it('/stores/:id (GET) - successful retrieval', async () => {
    const store = { id: 1, name: 'Store 1' };
    mockStoreRepository.findOne.mockResolvedValue(store);

    const response = await request(app.getHttpServer())
      .get('/stores/1')
      .expect(200);

    expect(response.body).toEqual(store);
  });

  it('/stores/:id (GET) - store not found', async () => {
    mockStoreRepository.findOne.mockResolvedValue(null); // Store não encontrado

    const response = await request(app.getHttpServer())
      .get('/stores/999')
      .expect(404);

    expect(response.body.message).toEqual('Store with ID 999 not found');
  });

  it('/stores/:id (PUT)', async () => {
    const updateStoreDto = { name: 'Updated Store 1' };
    const updatedStore = { id: 1, ...updateStoreDto };

    mockStoreRepository.findOne.mockResolvedValue(updatedStore);
    mockStoreRepository.update.mockResolvedValue(updatedStore);

    const response = await request(app.getHttpServer())
      .put('/stores/1')
      .send(updateStoreDto)
      .expect(200);

    expect(response.body).toEqual(updatedStore);
  });

  it('/stores/:id (DELETE)', async () => {
    mockStoreRepository.delete.mockResolvedValue({ affected: 1 });

    await request(app.getHttpServer()).delete('/stores/1').expect(204);
  });

  it('/stores/:id (DELETE) - store not found', async () => {
    mockStoreRepository.delete.mockResolvedValue({ affected: 0 }); // Store não encontrado

    const response = await request(app.getHttpServer())
      .delete('/stores/999')
      .expect(404);

    expect(response.body.message).toEqual('Store with ID 999 not found');
  });
});
