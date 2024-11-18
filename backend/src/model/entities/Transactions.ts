import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  avatar: string;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  date: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  recurring: boolean;
}
