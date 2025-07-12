/* Description: */
// Controllers are responsible for handling incoming requests and sending responses back to the client.

/*-------------------------------------------------------*/
import { Controller, Get, Render, Req, Res, HttpStatus, Query } from '@nestjs/common';
import {Response} from 'express'
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @Get()
  // getHello fn
  getHello(): string {
    console.log(this.appService)
    //   AppService {
    //   discoveryService: DiscoveryService {
    //     modulesContainer: ModulesContainer(3) [Map] {
    //       '584cbca3254ac603f38d7' => [Module],
    //       'ca3254ac603f38d70e704' => [Module],
    //       '4ac603f38d70e7041079c' => [Module],
    //       _applicationId: 'f584cbca3254ac603f38d',
    //       InternalCoreModule: [Module]
    //     }
    //   }
    // }
    return this.appService.getHello();
  }
  // add sum fn
  addSum(a:number,b:number): number {
      return this.appService.addSum(a,b);
    }


  // /add route
  @Get("/add")
  async findAll(@Query('num1') num1 : number, @Query('num2') num2: number) {
      num1 = +num1;
      num2 = +num2; // convert strings to numbers
      console.log(typeof(num1),typeof(num2))
      const sum = (this.addSum(num1,num2));
      return sum
  }
}

// Test/Practice App
// @Controller()
// export class AppController {
//   // @Get()
//   // create(@Res() res: Response) {
//   //   res.status(HttpStatus.OK).send('Hello World!')
//   // }
//   // @Render('index') // Renders 'views/index.hbs' (or .ejs)
//   // root() {
//   //   return { message: 'Hello world!' }; 
//   // }
// }

// flappybird App
@Controller()
export class FlappyController {

@Get()
create(@Res() res:Response) {
  return res.status(HttpStatus.BAD_REQUEST).send("BAD REQUEST!") || res.status(HttpStatus.OK).send("VALID REQUEST")
}
}