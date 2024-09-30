import { Module } from '@nestjs/common';
import { PricesService } from './prices.service';
import { PricesController } from './prices.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Price } from './price.entity';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Price,Product,Store])],
  providers: [PricesService,],
  controllers: [PricesController]
})
export class PricesModule {}
