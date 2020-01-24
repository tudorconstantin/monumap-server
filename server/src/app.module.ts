import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { MonumentsModule } from './monuments/monuments.module';

@Module({
  imports: [ItemsModule, MonumentsModule],
  controllers: [],
  providers: [ItemsService],
})
export class AppModule {}
