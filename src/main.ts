import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // append the prefix
  app.setGlobalPrefix('api/v1');

  // register the dto validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // register cookie parser for accessing cookies
  app.use(cookieParser());

  // register the http exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.SERVER_PORT ?? 8000);
}
bootstrap();
