import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient {
    constructor() {
        super({
            datasources: {
                db: {
                    url: 'mysql://root:a6xK4eda5NfFqBXffiB4@localhost:3307/WeatherForecastAndTrafficCam'
                }
            }
        });
    }
}
