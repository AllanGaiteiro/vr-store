import { IsOptional, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UpdateProductDto {
  @ApiProperty({
    description: 'Nova descrição do produto (opcional)',
    required: false,
  })
  @IsOptional()
  @IsNotEmpty({ message: 'A descrição do produto não pode ser vazia.' })
  description?: string;

  @ApiProperty({
    description: 'Novo custo do produto (opcional)',
    required: false,
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : value,
  )
  @IsOptional()
  @IsNumber({}, { message: 'O custo deve ser um número.' })
  cost?: number;
}
