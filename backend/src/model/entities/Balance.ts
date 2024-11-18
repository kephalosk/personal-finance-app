import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  current: number;

  @Column('decimal', { precision: 10, scale: 2 })
  income: number;

  @Column('decimal', { precision: 10, scale: 2 })
  expenses: number;
}
