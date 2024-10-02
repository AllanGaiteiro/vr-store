import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterProductDto {
  @ApiPropertyOptional({
    description: 'ID do produto para filtrar',
    example: 1,
    type: Number,
  })
  productId?: number;

  @ApiPropertyOptional({
    description: 'Descrição do produto para filtrar',
    example: 'Produto Exemplo',
    type: String,
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Custo mínimo do produto para filtrar',
    example: 10.0,
    type: Number,
  })
  minCost?: number;

  @ApiPropertyOptional({
    description: 'Custo máximo do produto para filtrar',
    example: 100.0,
    type: Number,
  })
  maxCost?: number;
}
