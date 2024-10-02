import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private produtoRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.produtoRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.produtoRepository.findOne({ where: { id } });
  }

  async create(produto: CreateProductDto): Promise<Product> {
    return this.produtoRepository.save(produto);
  }

  async update(id: number, updatePriceDto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    await this.produtoRepository.update(id, updatePriceDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.produtoRepository.delete(id);
    if (result?.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
