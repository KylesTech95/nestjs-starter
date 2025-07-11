import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { FlappybirdModule } from './flappybird.module';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(FlappybirdModule);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();