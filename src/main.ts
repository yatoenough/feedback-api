import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './shared/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const port = process.env.PORT;
  if (!port) {
    throw new Error('Port is undefined. Check .env file.');
  }

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(port, () =>
    logger.log(`API link: http://localhost:${port}`, 'Application'),
  );
}
bootstrap();
