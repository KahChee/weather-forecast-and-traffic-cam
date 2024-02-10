import { Module } from '@nestjs/common';
import { TrafficCamService } from './traffic-cam.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [TrafficCamService],
    exports: [TrafficCamService]
})
export class TrafficCamModule {}
