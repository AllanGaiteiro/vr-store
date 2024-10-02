import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';
import { FilterPricesDto } from './dto/filter-prices.dto';

@Injectable()
export class PricesService {
  constructor(
    @InjectRepository(Price)
    private priceRepository: Repository<Price>,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Store)
    private storeRepository: Repository<Store>,
  ) {}

  async create(createPriceDto: CreatePriceDto): Promise<Price> {
    const { productId, storeId, priceValue } = createPriceDto;

    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const store = await this.storeRepository.findOne({
      where: { id: storeId },
    });
    if (!store) {
      throw new NotFoundException(`Store with ID ${storeId} not found`);
    }

    const price = this.priceRepository.create({
      priceValue,
      product,
      store,
    });

    return this.priceRepository.save(price);
  }

  async findAll(filters: FilterPricesDto): Promise<Price[]> {
    try {
      const query = this.priceRepository
        .createQueryBuilder('price')
        .leftJoinAndSelect('price.product', 'product')
        .leftJoinAndSelect('price.store', 'store');

      // Aplica os filtros dinamicamente
      if (filters.productId) {
        query.andWhere('product.id = :productId', {
          productId: filters.productId,
        });
      }

      if (filters.storeId) {
        query.andWhere('store.id = :storeId', { storeId: filters.storeId });
      }

      if (filters.minPriceValue) {
        query.andWhere('price.priceValue >= :minPriceValue', {
          minPriceValue: filters.minPriceValue,
        });
      }

      if (filters.maxPriceValue) {
        query.andWhere('price.priceValue <= :maxPriceValue', {
          maxPriceValue: filters.maxPriceValue,
        });
      }

      // Agrupando resultados para retornar apenas um preço por produto
      if (
        filters?.singleItemPerProduct !== undefined &&
        JSON.parse(filters?.singleItemPerProduct + '')
      ) {
        const subQuery = this.priceRepository
          .createQueryBuilder('subPrice')
          .select('MIN(subPrice.id)')
          .where('subPrice.product.id = price.product.id');

        query.andWhere(`price.id = (${subQuery.getQuery()})`);
      }

      return await query.getMany();
    } catch (error) {
      console.error('Error fetching prices:', error);
      throw new InternalServerErrorException('Error fetching prices');
    }
  }

  async findOne(id: number): Promise<Price> {
    const price = await this.priceRepository.findOne({
      where: { id },
      relations: ['product', 'store'],
    });
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  async update(id: number, updatePriceDto: UpdatePriceDto): Promise<Price> {
    await this.findOne(id);
    await this.priceRepository.update(id, updatePriceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.priceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
  }
}
