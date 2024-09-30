import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { PricesModule } from './prices/prices.module';
import { Store } from './stores/store.entity';
import { Product } from './products/product.entity';
import { Price } from './prices/price.entity';
import * as dotenv from 'dotenv';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => (configService.get('typeorm'))
    }),
    TypeOrmModule.forFeature([Product, Store, Price]),
    ProductsModule,
    StoresModule,
    PricesModule,
  ],
})
export class AppModule {}
