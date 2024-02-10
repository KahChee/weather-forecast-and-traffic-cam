import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { SearchDateTime, TrafficCamResponse } from './dto';

@Injectable()
export class TrafficCamService {
    constructor(private readonly httpService: HttpService) {}

    getTrafficCam(searchDateTime: SearchDateTime = ''): Observable<AxiosResponse<TrafficCamResponse>> {
        let queryString = '';
        if (searchDateTime) {
            queryString = `?date_time=${searchDateTime}`;
        }

		return this.httpService.get(`https://api.data.gov.sg/v1/transport/traffic-images${queryString}`)
            .pipe(map(response => response.data.items));
    }
}
