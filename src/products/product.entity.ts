import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('produto')
export class Product {
  @ApiProperty({ description: 'Identificador único do produto', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: 'Descrição do produto',
  })
  @Column({ length: 60, name: 'descricao' })
  description: string;

  @ApiProperty({
    description: 'Custo do produto',
    nullable: true,
  })
  @Column('decimal', {
    precision: 13,
    scale: 2,
    nullable: true,
    name: 'custo',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  cost: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    nullable: true,
  })
  @Column({ nullable: true, name: 'imagem' })
  image: string;
}
