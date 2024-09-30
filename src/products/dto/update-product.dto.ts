import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nova descrição do produto (opcional)',
    example: 'Produto B',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'A descrição do produto não pode ser vazia.' })
  description?: string;

  @ApiProperty({
    description: 'Novo custo do produto (opcional)',
    example: 15.00,
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'O custo deve ser um número.' })
  cost?: number;
}
