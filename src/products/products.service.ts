import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.produtoRepository.find();
  }

  async create(produto: Product): Promise<Product> {
    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
