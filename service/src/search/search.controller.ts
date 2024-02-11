import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchLocationQueryParams, SearchWeatherInfoQueryParams } from './dto';

@Controller('v1/search')
export class SearchController {
    constructor(private searchService: SearchService) {}

    @Get('location')
    getLocation(@Query() queryParams: SearchLocationQueryParams) {
        const { searchDateTime } = queryParams;
        return this.searchService.getLocation(searchDateTime);
    }

    @Get('weather-info')
    getWeatherInfo(@Query() queryParams: SearchWeatherInfoQueryParams) {
        const { searchDateTime, areaName } = queryParams;
        return this.searchService.getWeatherInfo({ searchDateTime, areaName });
    }
}
