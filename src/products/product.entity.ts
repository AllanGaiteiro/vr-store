import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('produto')
export class Product {
  @ApiProperty({ description: 'Identificador único do produto', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: 'Descrição do produto',
    example: 'Produto Exemplo',
    maxLength: 60,
  })
  @Column({ length: 60, name: 'descricao' })
  description: string;

  @ApiProperty({
    description: 'Custo do produto',
    example: 15.99,
    nullable: true,
  })
  @Column('decimal', { precision: 13, scale: 3, nullable: true, name: 'custo' })
  cost: number;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'http://example.com/image.jpg',
    nullable: true,
  })
  @Column({ nullable: true, name: 'imagem' })
  image: string;
}
