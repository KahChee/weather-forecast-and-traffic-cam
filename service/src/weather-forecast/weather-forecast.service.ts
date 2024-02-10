import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { AreaMetadata, Item, SearchDateTime, WeatherForecastResponse } from './dto';

@Injectable()
export class WeatherForecastService {
    constructor(private readonly httpService: HttpService) {}

    getWeatherForecast(searchDateTime: SearchDateTime = ''): Observable<WeatherForecastResponse> {
        let queryString = '';
        if (searchDateTime) {
            queryString = `?date_time=${searchDateTime}`;
        }

		return this.httpService.get(`https://api.data.gov.sg/v1/environment/2-hour-weather-forecast${queryString}`)
            .pipe(map(response => response.data));
    }
    
    getWeatherForecastData(searchDateTime: SearchDateTime = ''): Observable<Item[]> {
        return this.getWeatherForecast(searchDateTime)
            .pipe(map(response => response.items));
    }

    getAreaMetadata(searchDateTime: SearchDateTime = ''): Observable<AreaMetadata[]> {
        return this.getWeatherForecast(searchDateTime)
            .pipe(map(response => response.area_metadata));
    }
}
