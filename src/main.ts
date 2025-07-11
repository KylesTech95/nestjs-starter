import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {join} from 'path';
import * as hbs from 'express-handlebars';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // set views
  app.setBaseViewsDir(join(__dirname,'..','views'))
  app.setViewEngine('hbs')
  await app.listen(3000);
}
bootstrap();
