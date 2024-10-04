import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('loja')
export class Store {
  @ApiProperty({ description: 'Identificador único da loja', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: 'Descrição da loja',
    maxLength: 60,
  })
  @Column({ length: 60, name: 'descricao' })
  description: string;
}
