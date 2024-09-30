import { Controller, Get, Post, Param, Body, Delete, HttpCode } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({ summary: 'Obter todos os produtos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de produtos retornada com sucesso.',
    type: [Product],
  })
  async findAll(): Promise<Product[]> {
    return this.productsService.findAll();
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
    return this.productsService.create(createProductDto);
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
