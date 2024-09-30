import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { PricesModule } from './prices/prices.module';
import { Store } from './stores/store.entity';
import { Product } from './products/product.entity';
import { Price } from './prices/price.entity';
import * as dotenv from 'dotenv';
import { DatabaseSeeder } from './database/database.seeder';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Product, Store, Price],
      synchronize: true, // Use apenas em desenvolvimento, desativar em produção
    }),
    TypeOrmModule.forFeature([Product, Store, Price]),
    ProductsModule,
    StoresModule,
    PricesModule,
  ],
  providers: [DatabaseSeeder],

})
export class AppModule { }
