import { IsInt, IsNotEmpty, Matches } from "class-validator";

export type Timezone = `+${number}${number}:${number}${number}`;

interface MostRecentTenSearch {
    searchDateTime: string;
    areaName: string;
}

export type MostRecentTenSearchResponse = MostRecentTenSearch[] | {};

export type DateTime = `
    ${number}${number}${number}${number}-
    ${number}${number}-
    ${number}${number}T
    ${number}${number}:
    ${number}${number}:
    ${number}${number}` |
    '';

export class TopTenSearchWithinThePeriodQueryParams {
    @IsNotEmpty()
    @Matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$')
    startDateTime: DateTime;

    @IsNotEmpty()
    @Matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$')
    endDateTime: DateTime;
}

interface TopTenSearchWithinThePeriod extends MostRecentTenSearch {
    totalSearch: number;
}

export type TopTenSearchWithinThePeriodResponse = TopTenSearchWithinThePeriod[] | {};

export class MostSearchWithinThePeriodQueryParams extends TopTenSearchWithinThePeriodQueryParams {
    @IsNotEmpty()
    @IsInt()
    period: number;
}

interface MostSearchWithinThePeriod {
    dateTime: string;
    count: number;
}

export interface MostSearchWithinThePeriodResponse {
    mostSearchWithinThePeriod: MostSearchWithinThePeriod[];
}
