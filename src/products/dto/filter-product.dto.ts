import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { BaseFilterDto } from '../../common/dto/base-filters.dto';

export class FilterProductDto extends BaseFilterDto {
  @ApiPropertyOptional({
    description: 'ID do produto para filtrar',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  productId?: number;

  @ApiPropertyOptional({
    description: 'Descrição do produto para filtrar',
    type: String,
  })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Custo mínimo do produto para filtrar',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  minCost?: number;

  @ApiPropertyOptional({
    description: 'Custo máximo do produto para filtrar',
    type: Number,
  })
  @IsOptional()
  @IsNumber()
  maxCost?: number;
}
