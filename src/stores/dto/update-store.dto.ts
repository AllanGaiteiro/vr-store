import { IsOptional, IsNotEmpty } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateStoreDto {
  @ApiPropertyOptional({
    description: 'Descrição da loja',
    example: 'Loja B',
  })
  @IsOptional()
  @IsNotEmpty({ message: 'A descrição não pode estar vazia' })
  description?: string;
}
