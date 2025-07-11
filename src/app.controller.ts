/* Description: */
// Controllers are responsible for handling incoming requests and sending responses back to the client.

/*-------------------------------------------------------*/
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
// export class AppController {
//   constructor(private readonly appService: AppService) {}

//   @Get()
//   getHello(): string {
//     return this.appService.getHello();
//   }

//   @Get()
//   addSum(a:number,b:number): number {
//     return this.appService.addSum(a,b);
//   }
// }
@Controller()
export class AppController {
  @Get()
  @Render('index') // Renders 'views/index.hbs' (or .ejs)
  root() {
    return { message: 'Hello world!' }; 
  }
}
