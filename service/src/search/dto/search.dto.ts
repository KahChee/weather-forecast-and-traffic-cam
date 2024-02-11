import { IsNotEmpty, Matches } from "class-validator";
import { Url } from "url";

export type SearchDateTime = `
    ${number}${number}${number}${number}-
    ${number}${number}-
    ${number}${number}T
    ${number}${number}:
    ${number}${number}:
    ${number}${number}` |
    '';

export class SearchLocationQueryParams {
    @IsNotEmpty()
    @Matches('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$')
    searchDateTime: SearchDateTime;
}

interface ImageMetadata {
    height: number;
    width: number;
    md5: string;
}

interface Location {
    latitude: number;
    longitude: number;
}

export interface TrafficCam {
    timestamp: string;
    image: Url;
    name: string;
    location: Location;
    camera_id: string;
    image_metadata: ImageMetadata;
}

interface LabelLocation {
    latitude: number;
    longitude: number;
}

export interface Area {
    name: string;
    label_location: LabelLocation;
    proximity: number;
}
