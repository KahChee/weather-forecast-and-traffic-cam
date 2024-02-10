import { Global, Module } from '@nestjs/common';
import { TrafficCamService } from './trafficCam.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [TrafficCamService],
    exports: [TrafficCamService]
})
export class TrafficCamModule {}
