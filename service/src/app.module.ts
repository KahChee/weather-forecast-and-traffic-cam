import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TrafficCamModule } from './traffic-cam/traffic-cam.module';

@Module({
    imports: [DatabaseModule, TrafficCamModule],
})
export class AppModule {}
