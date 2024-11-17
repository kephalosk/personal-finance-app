import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  target: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @Column()
  theme: string;
}
