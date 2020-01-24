import { Module, Logger } from '@nestjs/common';
import { MonumentsService } from './monuments.service';
import { MonumentsController } from './monuments.controller';

@Module({
  providers: [MonumentsService, Logger],
  controllers: [MonumentsController]
})
export class MonumentsModule {}
