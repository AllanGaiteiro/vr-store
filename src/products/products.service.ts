import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';
import { PaginatedResultService } from '../common/services/paginated-result.service';
import { BaseQueryService } from '../common/services/base-query.service';

@Injectable()
export class ProductsService extends BaseQueryService<Product> {
  private readonly paginatedResultService =
    new PaginatedResultService<Product>();

  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {
    super();
  }

  async findAll(
    filters?: FilterProductDto,
  ): Promise<PaginatedResultDto<Product>> {
    const query = this.productRepository.createQueryBuilder('product');

    // Aplica os filtros dinamicamente
    if (filters?.productId) {
      query.andWhere('product.id = :productId', {
        productId: filters.productId,
      });
    }

    if (filters?.description) {
      query.andWhere('product.description LIKE :description', {
        description: `%${filters.description}%`,
      });
    }

    if (filters?.minCost) {
      query.andWhere('product.cost >= :minCost', { minCost: filters.minCost });
    }

    if (filters?.maxCost) {
      query.andWhere('product.cost <= :maxCost', { maxCost: filters.maxCost });
    }

    this.applyPaginationAndSorting(query, filters);

    return this.paginatedResultService.getPaginatedResult(
      query,
      filters?.page,
      filters?.limit,
    );
  }

  async findOne(id: number): Promise<Product> {
    return this.productRepository.findOne({ where: { id } });
  }

  async create(produto: CreateProductDto): Promise<Product> {
    return this.productRepository.save(produto);
  }

  async update(id: number, updatePriceDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    await this.productRepository.update(id, updatePriceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result?.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
