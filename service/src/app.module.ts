import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TrafficCamModule } from './trafficCam/trafficCam.module';

@Module({
    imports: [DatabaseModule, TrafficCamModule],
})
export class AppModule {}
