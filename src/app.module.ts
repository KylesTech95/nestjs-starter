import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// mock service
const mockAppService = {
  // mock implementation
  property:"value"
}
// module object { inports,controllers,providers}
@Module({
  imports: [],
  controllers: [AppController],
  // providers: [AppService], // shorthand syntax
  providers: [ 
    {
      provide:AppService,
      useValue: mockAppService, // regular syntax
    }
  ]
})
// export module
export class AppModule {}
