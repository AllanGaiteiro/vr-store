import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.produtoRepository.find();
  }

  async create(produto: CreateProductDto): Promise<Product> {
    return this.produtoRepository.save(produto);
  }

  async remove(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
