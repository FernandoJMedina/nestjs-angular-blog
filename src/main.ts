import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  Logger.verbose(`Application running on port ${process.env.PORT}`, 'Running');
  await app.listen(process.env.PORT);
}
bootstrap();
