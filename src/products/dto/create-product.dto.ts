import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @ApiProperty({
    description: 'Descrição do produto',
  })
  @IsNotEmpty({ message: 'A descrição do produto é obrigatória.' })
  description: string;

  @ApiProperty({
    description: 'Custo do produto',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? parseFloat(value) : value,
  )
  @IsNotEmpty({ message: 'O custo do produto é obrigatório.' })
  @IsNumber({}, { message: 'O custo deve ser um número.' })
  cost: number;
}
