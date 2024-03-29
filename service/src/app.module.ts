import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TrafficCamModule } from './traffic-cam/traffic-cam.module';
import { WeatherForecastModule } from './weather-forecast/weather-forecast.module';
import { SearchModule } from './search/search.module';
import { ReportModule } from './report/report.module';

@Module({
    imports: [DatabaseModule, TrafficCamModule, WeatherForecastModule, SearchModule, ReportModule]
})
export class AppModule {}
