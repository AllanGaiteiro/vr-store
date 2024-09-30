import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { StoresService } from './stores.service';
import { Store } from './store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todas as lojas' })
  @ApiResponse({
    status: 200,
    description: 'Lista de lojas retornada com sucesso.',
    type: [Store],
  })
  async findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter uma loja pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID da loja a ser retornada' })
  @ApiResponse({
    status: 200,
    description: 'Loja retornada com sucesso.',
    type: Store,
  })
  @ApiResponse({
    status: 404,
    description: 'Loja não encontrada.',
  })
  async findOne(@Param('id') id: number): Promise<Store> {
    return this.storesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar uma nova loja' })
  @ApiBody({ type: CreateStoreDto, description: 'Dados para criar uma loja' })
  @ApiResponse({
    status: 201,
    description: 'Loja criada com sucesso.',
    type: Store,
  })
  async create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar uma loja pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID da loja a ser atualizada' })
  @ApiBody({ type: UpdateStoreDto, description: 'Dados para atualizar a loja' })
  @ApiResponse({
    status: 200,
    description: 'Loja atualizada com sucesso.',
    type: Store,
  })
  @ApiResponse({
    status: 404,
    description: 'Loja não encontrada.',
  })
  async update(
    @Param('id') id: number,
    @Body() updateStoreDto: UpdateStoreDto,
  ): Promise<Store> {
    return this.storesService.update(id, updateStoreDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma loja pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID da loja a ser removida' })
  @ApiResponse({
    status: 200,
    description: 'Loja removida com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Loja não encontrada.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.storesService.remove(id);
  }
}
