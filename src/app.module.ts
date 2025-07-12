import { Module, Logger } from '@nestjs/common';
import { AppService, FlappyService } from './app.service';
import { DiscoveryModule } from '@nestjs/core';
import * as CON from './constants'

/* Controllers */
import { AppController } from './app.controller';
import { FlappyController } from './flappybird.controller';


// const constants = JSON.stringify(CON.constants);
// console.log("Constants\n"+constants)

// mock service
// const mockAppService = {
//   // mock implementation
//   property:"value"
// }

// alias service
// const aliasAppProvider = {
//   provide:constants['alias'],
//   useExisting: AppService
// }
// module object { inports,controllers,providers}
// @Module({
//   imports: [DiscoveryModule],
//   controllers: [AppController],
//   providers: [AppService], // shorthand syntax
//   // providers: [ 
//   //   {
//   //     provide:AppService,
//   //     useValue: mockAppService, // regular syntax
//   //   }
//   // ]
// })

// Flappybird module
@Module({
  imports:[DiscoveryModule],
  controllers: [FlappyController],
  providers: [FlappyService]
})
// export module
export class AppModule {}