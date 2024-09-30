import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Price } from './price.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';

@Injectable()
export class PricesService {
    constructor(
        @InjectRepository(Price)
        private priceRepository: Repository<Price>,
    ) { }

    async create(createPriceDto: CreatePriceDto): Promise<Price> {
        const price = this.priceRepository.create(createPriceDto);
        return this.priceRepository.save(price);
    }

    async findAll(): Promise<Price[]> {
        return this.priceRepository.find();
    }

    async findOne(id: number): Promise<Price> {
        const price = await this.priceRepository.findOne({ where: { id } });
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
