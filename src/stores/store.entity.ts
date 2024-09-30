import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('loja')
export class Store {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ length: 60, name: 'descricao' })
  description: string;
}
