import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// module object { inports,controllers,providers}
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// export module
export class AppModule {}
