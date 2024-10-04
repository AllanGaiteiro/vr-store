import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('PrecoVenda')
export class Price {
  @ApiProperty({ description: 'Identificador único do preço' })
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({
    description: 'Produto associado ao preço',
    type: () => Product,
  })
  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  @JoinColumn({ name: 'produto_id' })
  product: Product;

  @ApiProperty({ description: 'Loja associada ao preço', type: () => Store })
  @ManyToOne(() => Store, (store) => store.id, { eager: true })
  @JoinColumn({ name: 'loja_id' })
  store: Store;

  @ApiProperty({
    description: 'Valor do preço',
    type: 'number',
  })
  @Column('decimal', {
    precision: 13,
    scale: 2,
    nullable: true,
    name: 'precoVenda',
    transformer: {
      to: (value: number) => value,
      from: (value: string) => parseFloat(value),
    },
  })
  priceValue: number;
}
