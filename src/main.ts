import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
// import { FlappyBirdModule } from './flappybird.module';
import {join} from 'path';
import * as hbs from 'express-handlebars';
// import { Logger } from '@nestjs/common';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }

// 
async function bootstrapApp() {
  // create app with nestfactory
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{logger:false});
  
  // set views
  app.setBaseViewsDir(join(__dirname,'..','views'))
  app.setViewEngine('hbs')
  await app.listen(process.env.PORT||3000);
}
bootstrapApp();

// flappy bird
// async function bootstrapFlappyBirdApp() {
//   // create app with nestfactory
//   const app = await NestFactory.create<NestExpressApplication>(FlappyBirdModule,{logger:false});
  
//   // set views
//   app.setBaseViewsDir(join(__dirname,'..','views'))
//   app.setViewEngine('hbs')
//   await app.listen(process.env.PORT||3000);
// }
// bootstrapFlappyBirdApp();
