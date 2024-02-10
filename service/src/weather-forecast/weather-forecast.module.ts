import { Module } from '@nestjs/common';
import { WeatherForecastService } from './weather-forecast.service';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [WeatherForecastService],
    exports: [WeatherForecastService]
})
export class WeatherForecastModule {}
