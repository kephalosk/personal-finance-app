import 'reflect-metadata';
import { DataSource } from 'typeorm';
import process from 'node:process';
import { Pots } from './model/entities/Pots';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },
  synchronize: false,
  logging: true,
  entities: [Pots],
  migrations: [],
  subscribers: [],
});
