import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterPricesDto {
  @ApiPropertyOptional({
    description: 'ID do produto para filtrar',
    type: Number,
  })
  productId?: number;

  @ApiPropertyOptional({
    description: 'ID da loja para filtrar',
    type: Number,
  })
  storeId?: number;

  @ApiPropertyOptional({
    description: 'Nome do Produto para filtrar',
    type: String,
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Valor mínimo do preço para filtrar',
    type: Number,
  })
  minPriceValue?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo do preço para filtrar',
    type: Number,
  })
  maxPriceValue?: number;

  @ApiPropertyOptional({
    description: 'Valor mínimo do custo do produt para filtrar',
    type: Number,
  })
  minCost?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo do custo do produt para filtrar',
    type: Number,
  })
  maxCost?: number;

  @ApiPropertyOptional({
    description: 'Retornar Apenas um por produto',
    example: false,
    type: Boolean,
  })
  singleItemPerProduct: boolean;
}
