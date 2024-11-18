import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Budgets {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  category: string;

  @Column('decimal', { precision: 10, scale: 2 })
  maximum: number;

  @Column()
  theme: string;
}
