import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { isBoolean } from 'class-validator';

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
    description: 'Retornar Apenas um por produto',
    example: false,
    type: Boolean,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? isBoolean(value) : value,
  )
  singleItemPerProduct: boolean;
}
