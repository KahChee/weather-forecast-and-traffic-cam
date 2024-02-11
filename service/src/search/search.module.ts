import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TrafficCamModule } from 'src/traffic-cam/traffic-cam.module';
import { WeatherForecastModule } from 'src/weather-forecast/weather-forecast.module';

@Module({
    imports: [TrafficCamModule, WeatherForecastModule],
    controllers: [SearchController],
    providers: [SearchService]
})
export class SearchModule {}
