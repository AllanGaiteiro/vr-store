import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
  @ApiProperty({
    description: 'Descrição da loja',
  })
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  description: string;
}
