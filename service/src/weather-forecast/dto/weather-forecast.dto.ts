export type SearchDateTime = `
    ${number}${number}${number}${number}-
    ${number}${number}-
    ${number}${number}T
    ${number}${number}:
    ${number}${number}:
    ${number}${number}` |
    '';

interface LabelLocation {
    latitude: number;
    longitude: number;
}

interface AreaMetadata {
    name: string;
    label_location: LabelLocation;
}

interface ValidPeriod {
    start: string;
    end: string;
}

interface Forecast {
    area: string;
    forecast: string;
}

export interface Item {
    update_timestamp: string;
    timestamp: string;
    valid_period: ValidPeriod;
    forecasts: Forecast[];
}

interface ApiInfo {
    status: 'healthy';
}

export interface WeatherForecastResponse {
    area_metadata: AreaMetadata[];
    items: Item[];
    api_info: ApiInfo;
}

export interface AreaMetadataResponse {
    timestamp: string;
    areas: AreaMetadata[];
}
