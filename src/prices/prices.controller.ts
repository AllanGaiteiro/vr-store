import { Controller, Get, Post, Param, Body, Patch, Delete, NotFoundException } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Post()
  async create(@Body() createPriceDto: CreatePriceDto): Promise<Price> {
    return this.pricesService.create(createPriceDto);
  }

  @Get()
  async findAll(): Promise<Price[]> {
    return this.pricesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Price> {
    const price = await this.pricesService.findOne(id);
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ): Promise<Price> {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.pricesService.remove(id);
  }
}
