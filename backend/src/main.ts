import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import process from 'node:process';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  console.log(
    process.env.DATABASE_HOST,
    parseInt(process.env.DATABASE_PORT, 10),
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    process.env.DATABASE_NAME,
  );
  await app.listen(3000);
}
bootstrap();
