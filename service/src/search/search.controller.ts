import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchLocationQueryParams, SearchWeatherInfoQueryParams, WeatherInfoResponse } from './dto';

@Controller('v1/search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('location')
    getLocation(@Query() queryParams: SearchLocationQueryParams) {
        const { searchDateTime } = queryParams;
        return this.searchService.getLocation(searchDateTime);
    }

    @Get('weather-info')
    async getWeatherInfo(@Query() queryParams: SearchWeatherInfoQueryParams) {
        const { searchDateTime, areaName } = queryParams;
        let weatherInfo: WeatherInfoResponse;

        try {
            weatherInfo = await this.searchService.getWeatherInfo({ searchDateTime, areaName });
            return weatherInfo;
        }
        catch(e) {
            console.error('Error in getWeatherInfo', e);
        }
        finally {
            this.searchService.createSearchRecord({ searchDateTime, areaForecast: weatherInfo.forecast });
        }
    }
}
