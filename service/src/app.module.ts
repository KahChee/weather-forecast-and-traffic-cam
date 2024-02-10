import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TrafficCamModule } from './traffic-cam/traffic-cam.module';
import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';

@Module({
    imports: [DatabaseModule, TrafficCamModule, WeatherForecastModule],
})
export class AppModule {}
