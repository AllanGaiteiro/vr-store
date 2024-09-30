import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Product } from '../products/product.entity';
import { Store } from '../stores/store.entity';

@Entity('PrecoVenda') 
export class Price {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Product, product => product.id)
  @JoinColumn({ name: 'produto_id' }) 
  product: Product;

  @ManyToOne(() => Store, store => store.id)
  @JoinColumn({ name: 'loja_id' })
  store: Store;

  @Column('decimal', { precision: 13, scale: 3, name: 'valor' })
  priceValue: number;
}
