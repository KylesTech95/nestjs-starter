import { Controller, Get, Render, Req, Res, HttpStatus, Query } from '@nestjs/common';
import {Response, Request} from 'express'
import { FlappyService } from './app.service';

/* Flappy Bird ------------------------------------------------ */
// @Controller("flappybird")
@Controller("flappy")
export class FlappyController {
constructor(private readonly flappyService: FlappyService) {}

// @Get() // root
// root() {
//   return { message: 'Welcome to Flappybird!'}
// }

@Get("/canvas-init")
initializeCanvas() : string { 
  return this.flappyService.initalizeCanvas(350,475,{backgroundColor:'#0f0'});
}
// create(@Res() res:Response, @Req() req: Request) {
//   let path = req.path;
//   console.log("Path\n"+path)

//   console.log("\nService\n"+this.flappyService);
  
//   return res.status(HttpStatus.BAD_REQUEST).send("BAD REQUEST!") || res.status(HttpStatus.OK).send("VALID REQUEST")
// }
}