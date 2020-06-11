import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ItemsService } from './items/items.service';
import { MonumentsModule } from './monuments/monuments.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ItemsModule, MonumentsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'data', 'geojson'),
      serveRoot: '/api/geojson/',
    }),
  ],
  controllers: [],
  providers: [ItemsService],
})
export class AppModule {}
