import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsIn } from 'class-validator';

export class BaseFilterDto {
  @ApiPropertyOptional({
    description: 'Número da página para paginação',
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  page?: number;

  @ApiPropertyOptional({
    description: 'Limite de itens por página para paginação',
    type: Number,
  })
  @IsOptional()
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({
    description:
      'Ordenação dos resultados, ASC para ascendente, DESC para descendente',
    example: 'DESC',
    enum: ['ASC', 'DESC'],
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'Campo para ordenar os resultados',
    type: String,
  })
  @IsOptional()
  sortBy?: string;
}
