import { Controller, Get, Render, Req, Res, HttpStatus, Query, Header } from '@nestjs/common';
import {Response, Request} from 'express'
import { FlappyService } from './app.service';

/* Flappy Bird ------------------------------------------------ */
// @Controller("flappybird")
@Controller("flappy")
export class FlappyController {
constructor(private readonly flappyService: FlappyService) {}

// initialize canvas to client
@Get("/canvas-init")
@Header('Content-Type','text-html')
initializeCanvas() : string { 
  return this.flappyService.initalizeCanvas(350,475,{style:{backgroundColor:'red',boxShadow:"0 .5rem 12px .9px #333"},id:'canvas-id',class:['canvas-class','z-999']});
}


// @Get() // root may override ServeStaticModule in ./app/module.ts
// root() {
//   return { message: 'Welcome to Flappybird!'}
// }
// create(@Res() res:Response, @Req() req: Request) {
//   let path = req.path;
//   console.log("Path\n"+path)

//   console.log("\nService\n"+this.flappyService);
  
//   return res.status(HttpStatus.BAD_REQUEST).send("BAD REQUEST!") || res.status(HttpStatus.OK).send("VALID REQUEST")
// }
}