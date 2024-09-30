import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePriceDto {
  @ApiProperty({
    description: 'ID do produto associado ao preço',
    example: 1,
  })
  @IsNotEmpty({ message: 'O ID do produto é obrigatório' })
  @IsNumber({}, { message: 'O valor do preço deve ser um número' })
  productId: number;

  @ApiProperty({
    description: 'ID da loja onde o preço é aplicado',
    example: 1,
  })
  @IsNotEmpty({ message: 'O ID da loja é obrigatório' })
  @IsNumber({}, { message: 'O valor do preço deve ser um número' })
  storeId: number;

  @ApiProperty({
    description: 'Valor do preço',
    example: 15.00,
  })
  @IsNotEmpty({ message: 'O valor do preço é obrigatório' })
  @IsNumber({}, { message: 'O valor do preço deve ser um número' })
  priceValue: number;
}
