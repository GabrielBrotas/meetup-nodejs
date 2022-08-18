import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  console.log(process.env.ENVIRONMENT);

  await app.listen(4001);
}

bootstrap();
