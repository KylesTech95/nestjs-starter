import { Injectable } from '@nestjs/common';

// Injectable is a provider
@Injectable()
export class AppService {
  // say hello
  getHello(): string {
    return 'Hello World!';
  }
  // add sum
  addSum(a:number,b:number): number {
    return a + b;
  }
}
