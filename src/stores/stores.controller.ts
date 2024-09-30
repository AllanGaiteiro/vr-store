import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { StoresService} from './stores.service';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Store> {
    return this.storesService.findOne(id);
  }

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.storesService.remove(id);
  }
}
