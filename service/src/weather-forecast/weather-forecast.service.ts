import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AreaMetadataResponse, Item, SearchDateTime, WeatherForecastResponse } from './dto';

@Injectable()
export class WeatherForecastService {
    constructor(private readonly httpService: HttpService) {}

    async getWeatherForecast(searchDateTime: SearchDateTime = ''): Promise<WeatherForecastResponse> {
        let queryString = '';
        if (searchDateTime) {
            queryString = `?date_time=${searchDateTime}`;
        }

        const response = await firstValueFrom(
            this.httpService.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast${queryString}`)
        );
        return response.data;
    }
    
    async getWeatherForecastData(searchDateTime?: SearchDateTime): Promise<Item[]> {
        const response = await this.getWeatherForecast(searchDateTime);
        return response.items;
    }

    async getAreaMetadata(searchDateTime?: SearchDateTime): Promise<AreaMetadataResponse> {
        const response = await this.getWeatherForecast(searchDateTime);
        const areaMetadata = {
            timestamp: response.items[0].timestamp,
            areas: response.area_metadata
        };
        return areaMetadata;
    }
}
