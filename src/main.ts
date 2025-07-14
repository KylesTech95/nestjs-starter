// import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import {readdirSync,appendFileSync, readFileSync} from 'fs'
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

scanDirforHiddenFiles('..')
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



/*---------------------------------------------*/
// scan root for hidden-files
async function scanDirforHiddenFiles(directory:string) {
  const gitignore = require('path').join(__dirname,'../.gitignore')
  const lines = getLines(gitignore)
  // scan dir
  const files = readdirSync(require('path').join(__dirname,directory));
  // console.log(files)

  // files that have not been ignored
  const hiddenFiles = files.filter(x=>/^\..*\.env$/.test(x));
  

  // map hidden files within gitignore
  hiddenFiles.map(f=>{
    if(!hiddenFileExists(lines,f)){ // check if file exists
      appendFileSync((gitignore),"\n"+f+"\n", {encoding:'utf-8'}) // append to file
    }
  });
  return;
}
// check if file exists within file
function hiddenFileExists(arr:string[],file: string){
  let carriage = '\r'
  if(arr.includes(file+carriage) || arr.indexOf(file+carriage)===-1){
    console.log('file does not exist')
  } else {
    console.error('file exists within .gitignore')
  }
  return arr.includes(file+carriage) || arr.indexOf(file+carriage)!==-1
}
// get lines from a file
function getLines(file:string):string[]{
 let readfile = readFileSync(file,'utf-8');
 let lines = readfile.split("\n");
 return lines;
}
// getLines(require('path').resolve(__dirname,'../.gitignore'));