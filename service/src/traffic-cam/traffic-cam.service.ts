import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { SearchDateTime, TrafficCamResponse } from './dto';

@Injectable()
export class TrafficCamService {
    constructor(private readonly httpService: HttpService) {}

    async getTrafficCam(searchDateTime: SearchDateTime = ''): Promise<TrafficCamResponse> {
        let queryString = '';
        if (searchDateTime) {
            queryString = `?date_time=${searchDateTime}`;
        }

        const response = await firstValueFrom(
            this.httpService.get(`https://api.data.gov.sg/v1/transport/traffic-images${queryString}`)
        );
        return response.data.items;
    }
}
