import { Controller, Get, Post, Req, Res, HttpStatus, Query, Header } from '@nestjs/common';
import {Response, Request} from 'express'
import { FlappyService } from './app.service';
let fakescore = 0;

/* Flappy Bird ------------------------------------------------ */
// @Controller("flappybird")
@Controller("flappy")
export class FlappyController {
constructor(private readonly flappyService: FlappyService) {}

// initialize canvas to client
@Get("/canvas-init")
@Header('Content-Type','text-html')
initializeCanvas() : string { 
  return this.flappyService.initalizeCanvas(750,900,{
    // styles
    style:
    {
      backgroundColor:'rgb(237, 236, 229);',
      // backgroundImage:"url('./media/flappybird-background.png')",
      backgroundPosition:'center',
      backgroundRepeat:'no-repeat',
      backgroundSize:'contain',
      boxShadow:"0 .5rem 12px .9px #333"
    },
    // id
    id:'canvas-id',
    // classes
    class:['canvas-class','z-999']});
}









/* Manage Scores */
// add score
@Post("/score/add")
// @Header('Content-Type','application/json')
add(@Req() req: Request, @Res() res: Response) {
// const {score} = req['body'];
console.log("adding")
console.log(fakescore)
fakescore >= 0 ? fakescore+=1 : undefined;
res.send("Adding:\n"+fakescore)
}

// subtract score
@Post("/score/sub")
// @Header('Content-Type','application/json')
subtract(@Req() req: Request, @Res() res: Response) {
// const {score} = req['body'];
console.log("subtracting")
console.log(fakescore)
fakescore >= 1 ? fakescore-=1 : undefined;
res.send("Subtracting:\n"+fakescore)
}

// get current score
@Get("/score/current")
@Header('Content-Type','application/json')
create(@Req() req: Request, @Res() res: Response) {
  res.status(200).json({score:fakescore})
}
}// method body
