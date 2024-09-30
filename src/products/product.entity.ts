import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('produto') 
export class Product {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 60, name: 'descricao' })
  description: string;

  @Column('decimal', { precision: 13, scale: 3, nullable: true, name: 'custo' })
  cost: number; 

  @Column({ nullable: true, name: 'imagem' })
  image: string; 
}
