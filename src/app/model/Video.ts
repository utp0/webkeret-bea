export interface Video {
    id: string;
    title: string;
    originalUrl: string;
    length: number;  // seconds
    sharerId: string;
    shareDescription: string;
    shareDate: number;  // unix time
}