import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { PricesModule } from './prices/prices.module';
import { Store } from './stores/store.entity';
import { Product } from './products/product.entity';
import { Price } from './prices/price.entity';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...(process.env.DATABASE_URL
        ? { url: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
        : {
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10) || 5432,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          }),
      entities: [Product, Store, Price],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Product, Store, Price]),
    ProductsModule,
    StoresModule,
    PricesModule,
  ],
})
export class AppModule {}
