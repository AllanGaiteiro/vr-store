import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Patch,
  Delete,
  NotFoundException,
  HttpCode,
  Query,
} from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { FilterPricesDto } from './dto/filter-prices.dto';

@ApiTags('prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os preços ou filtrar por critérios' })
  @ApiResponse({
    status: 200,
    description: 'Lista de preços retornada com sucesso.',
    type: [Price],
  })
  async findAll(@Query() filters?: FilterPricesDto): Promise<Price[]> {
    return this.pricesService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um preço pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID do preço a ser retornado' })
  @ApiResponse({
    status: 200,
    description: 'Preço retornado com sucesso.',
    type: Price,
  })
  @ApiResponse({
    status: 404,
    description: 'Preço não encontrado.',
  })
  async findOne(@Param('id') id: number): Promise<Price> {
    const price = await this.pricesService.findOne(id);
    if (!price) {
      throw new NotFoundException(`Price with ID ${id} not found`);
    }
    return price;
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo preço' })
  @ApiBody({ type: CreatePriceDto, description: 'Dados para criar um preço' })
  @ApiResponse({
    status: 201,
    description: 'Preço criado com sucesso.',
    type: Price,
  })
  async create(@Body() createPriceDto: CreatePriceDto): Promise<Price> {
    return this.pricesService.create(createPriceDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um preço pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID do preço a ser atualizado' })
  @ApiBody({
    type: UpdatePriceDto,
    description: 'Dados para atualizar o preço',
  })
  @ApiResponse({
    status: 200,
    description: 'Preço atualizado com sucesso.',
    type: Price,
  })
  async update(
    @Param('id') id: number,
    @Body() updatePriceDto: UpdatePriceDto,
  ): Promise<Price> {
    return this.pricesService.update(id, updatePriceDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover um preço pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID do preço a ser removido' })
  @ApiResponse({
    status: 204,
    description: 'Preço removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Preço não encontrado.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.pricesService.remove(id);
  }
}
