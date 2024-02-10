import { Url } from "url";

export type SearchDateTime = `
    ${number}${number}${number}${number}-
    ${number}${number}-
    ${number}${number}T
    ${number}${number}:
    ${number}${number}:
    ${number}${number}` |
    '';

interface ImageMetadata {
    height: number;
    width: number;
    md5: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

interface Camera {
    timestamp: string;
    image: Url;
    location: Location;
    camera_id: string;
    image_metadata: ImageMetadata;
}

interface Item {
    timestamp: string;
    cameras: Camera[];
}

interface ApiInfo {
    status: 'healthy';
}

export interface TrafficCamResponse {
    items: Item[];
    api_info: ApiInfo;
}
