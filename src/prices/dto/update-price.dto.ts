import { IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePriceDto {
  @ApiProperty({
    description: 'Novo valor do preço (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O valor do preço deve ser um número' })
  priceValue?: number;
}
