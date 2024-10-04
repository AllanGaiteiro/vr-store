import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  HttpCode,
  NotFoundException,
  Patch,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { FilterProductDto } from './dto/filter-product.dto';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiQuery,
} from '@nestjs/swagger';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginatedResultDto } from '../common/dto/paginated-result.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({
    summary: 'Obter todos os produtos com filtros opcionais e paginação',
  })
  @ApiQuery({ name: 'page', required: false, description: 'Número da página' })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limite de itens por página',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
    type: [Product],
  })
  async findAll(
    @Query() filters?: FilterProductDto,
  ): Promise<PaginatedResultDto<Product>> {
    return this.productsService.findAll(filters);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID do produto a ser retornado' })
  @ApiResponse({
    status: 200,
    description: 'produto retornado com sucesso.',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
  })
  async findOne(@Param('id') id: number): Promise<Product> {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  @Post()
  @ApiOperation({ summary: 'Criar um novo produto' })
  @ApiBody({ type: CreateProductDto, description: 'Os dados do novo produto' })
  @ApiResponse({
    status: 201,
    description: 'Produto criado com sucesso.',
    type: Product,
  })
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    if (createProductDto.cost !== undefined) {
      createProductDto.cost = Number(createProductDto.cost); // Converta para número
    }
    return this.productsService.create(createProductDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um produto pelo ID' })
  @ApiParam({ name: 'id', description: 'O ID do produto a ser atualizado' })
  @ApiBody({
    type: UpdateProductDto,
    description: 'Dados para atualizar o produto',
  })
  @ApiResponse({
    status: 200,
    description: 'Poduto atualizado com sucesso.',
    type: Product,
  })
  async update(
    @Param('id') id: number,
    @Body() updateProdutoDto: UpdateProductDto,
  ): Promise<Product> {
    if (updateProdutoDto.cost !== undefined) {
      updateProdutoDto.cost = Number(updateProdutoDto.cost); // Converta para número
    }
    return this.productsService.update(id, updateProdutoDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: 'Remover um produto por ID' })
  @ApiParam({ name: 'id', description: 'O ID do produto a ser removido' })
  @ApiResponse({
    status: 204,
    description: 'Produto removido com sucesso.',
  })
  @ApiResponse({
    status: 404,
    description: 'Produto não encontrado.',
  })
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }
}
