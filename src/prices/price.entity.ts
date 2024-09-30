import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('PrecoVenda') 
export class Price {
  @ApiProperty({ description: 'Identificador único do preço', example: 1 })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Produto associado ao preço', type: () => Product })
  @ManyToOne(() => Product, product => product.id, { eager: true })
  @JoinColumn({ name: 'produto_id' }) 
  product: Product;

  @ApiProperty({ description: 'Loja associada ao preço', type: () => Store })
  @ManyToOne(() => Store, store => store.id, { eager: true })
  @JoinColumn({ name: 'loja_id' })
  store: Store;

  @ApiProperty({
    description: 'Valor do preço',
    example: 10.50,
    type: 'number'
  })
  @Column('decimal', { precision: 13, scale: 3, name: 'valor' })
  priceValue: number;
}
