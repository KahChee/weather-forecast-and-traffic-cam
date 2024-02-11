import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { TrafficCamService } from 'src/traffic-cam/traffic-cam.service';
import { WeatherForecastService } from 'src/weather-forecast/weather-forecast.service';
import { Area, SearchDateTime, SearchWeatherInfoQueryParams, TrafficCam, WeatherInfoResponse } from './dto';

@Injectable()
export class SearchService {
    constructor(
        private databaseService: DatabaseService,
        private trafficCamService: TrafficCamService,
        private weatherForecastService: WeatherForecastService
    ) {}

    async getLocation(searchDateTime: SearchDateTime = ''): Promise<TrafficCam[]> {
        const [trafficCamResponse, areaMetadataResponse] = await Promise.all([
            this.trafficCamService.getTrafficCam(searchDateTime),
            this.weatherForecastService.getAreaMetadata(searchDateTime)
        ]);

        const trafficCam = trafficCamResponse[0].cameras.map((tc: TrafficCam) => {
            let areas = [...areaMetadataResponse.areas];
            areas = areas.map((area: Area) => {
                area.proximity = Math.abs(tc.location.latitude - area.label_location.latitude) +
                    Math.abs(tc.location.longitude - area.label_location.longitude);
                return area;
            });

            const area = areas.reduce((finalAreaObj: Area, areaObj: Area) => {
                if (areaObj.proximity < finalAreaObj.proximity) finalAreaObj = areaObj;
                return finalAreaObj;
            }, { ...areas[0] });
            tc.name = area.name;

            return tc;
        });

        return trafficCam;
    }

    async getWeatherInfo({ searchDateTime, areaName }: SearchWeatherInfoQueryParams): Promise<WeatherInfoResponse> {
        const weatherForecast = await this.weatherForecastService.getWeatherForecastData(searchDateTime);
        const areaForecast = weatherForecast[0].forecasts
            .find(forecast => forecast.area.toLowerCase() === areaName.toLowerCase());
        const areaWeatherInfo = {
            ...weatherForecast[0],
            forecast: areaForecast
        };
        delete areaWeatherInfo.forecasts;
        return areaWeatherInfo;
    }
}
