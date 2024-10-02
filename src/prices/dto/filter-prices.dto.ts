import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterPricesDto {
  @ApiPropertyOptional({
    description: 'ID do produto para filtrar',
    example: 1,
    type: Number,
  })
  productId?: number;

  @ApiPropertyOptional({
    description: 'ID da loja para filtrar',
    example: 2,
    type: Number,
  })
  storeId?: number;

  @ApiPropertyOptional({
    description: 'Valor mínimo do preço para filtrar',
    example: 10.0,
    type: Number,
  })
  minPriceValue?: number;

  @ApiPropertyOptional({
    description: 'Valor máximo do preço para filtrar',
    example: 100.0,
    type: Number,
  })
  maxPriceValue?: number;
}
