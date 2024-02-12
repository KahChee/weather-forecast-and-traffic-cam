import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { MostRecentTenSearchResponse, MostSearchWithinThePeriodQueryParams, MostSearchWithinThePeriodResponse, TopTenSearchWithinThePeriodQueryParams, TopTenSearchWithinThePeriodResponse } from "./dto";

@Injectable()
export class ReportService {
	constructor(private databaseService: DatabaseService) {}
	
	async getMostRecentTenSearch(): Promise<MostRecentTenSearchResponse> {
        const result = await this.databaseService.$queryRaw`
            SELECT
                CONVERT_TZ(FROM_UNIXTIME(searchTimestamp), '+00:00', '+08:00') as searchDateTime,
                JSON_UNQUOTE(JSON_EXTRACT(location, '$.area')) as areaName
            FROM SearchHistory
            GROUP BY
                searchTimestamp,
                areaName
            ORDER BY searchTimestamp DESC
            LIMIT 10;
        `;

        return result;
    }

	async getTopTenSearchWithinThePeriod({ startDateTime, endDateTime }: TopTenSearchWithinThePeriodQueryParams): Promise<TopTenSearchWithinThePeriodResponse> {
        const startTimestamp = Math.floor(new Date(new Date(startDateTime).toISOString()).valueOf() / 1000);
        const endTimestamp = Math.floor(new Date(new Date(endDateTime).toISOString()).valueOf() / 1000);
        
        // @ts-ignore
        BigInt.prototype.toJSON = function () {
            const int = Number.parseInt(this.toString());
            return int ?? this.toString();
        };

        const result = await this.databaseService.$queryRaw`
            SELECT
                CONVERT_TZ(FROM_UNIXTIME(searchTimestamp), '+00:00', '+08:00') as searchDateTime,
                JSON_UNQUOTE(JSON_EXTRACT(location, '$.area')) as areaName,
                COUNT(searchTimestamp) as totalSearch
            FROM SearchHistory
            WHERE
                searchTimestamp BETWEEN ${startTimestamp} AND ${endTimestamp}
            GROUP BY
                searchTimestamp,
                areaName
            ORDER BY totalSearch DESC
            LIMIT 10;
        `;

		return result;
	}

	async getMostSearchWithinThePeriod({ startDateTime, endDateTime, period }: MostSearchWithinThePeriodQueryParams): Promise<MostSearchWithinThePeriodResponse> {
        const startTimestamp = Math.floor(new Date(new Date(startDateTime).toISOString()).valueOf() / 1000);
        const endTimestamp = Math.floor(new Date(new Date(endDateTime).toISOString()).valueOf() / 1000);
        const maxAllowDifferent = period * 60;

        // Retrieve the result from SearchHistory
        const result = await this.databaseService.searchHistory.findMany({
            select: {
                id: true,
                searchTimestamp: true
            },
            where: {
                searchTimestamp: {
                    gte: startTimestamp,
                    lte: endTimestamp
                }
            },
            orderBy: [
                { searchTimestamp: 'asc' },
                { id: 'asc' }
            ]
        });

        // Count the total search for each searchTimestamp
        const mostSearchMap = {};
        result.forEach(({ searchTimestamp }, resultIndex) => {
            if (!mostSearchMap[searchTimestamp]) {
                mostSearchMap[searchTimestamp] = 0;
                let resultWithinTheSearchPeriod = [...result].slice(resultIndex);

                resultWithinTheSearchPeriod.forEach(searchRecord => {
                    let searchTimestampDifferent = Math.abs(searchRecord.searchTimestamp - searchTimestamp);
                    
                    if (searchTimestampDifferent >= 0 &&
                        searchTimestampDifferent < maxAllowDifferent) {
                        mostSearchMap[searchTimestamp] += 1;
                    }
                });
            }
        });

        // Retrieve the mostSearch record
        const mostSearchCount: number[] = Object.values(mostSearchMap);
        const maxCount = Math.max(...mostSearchCount);
        const mostSearchResult = Object.entries(mostSearchMap)
            .filter(([, count]) => count === maxCount)
            .reduce((mostSearchRecord, [timeStamp, count]) => {
                mostSearchRecord.push({
                    dateTime: new Date(+timeStamp * 1000).toLocaleString(),
                    count
                });
                return mostSearchRecord;
            }, []);

		return { mostSearchWithinThePeriod: mostSearchResult };
	}
}
