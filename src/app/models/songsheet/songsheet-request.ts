export interface SongsheetRequest {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly artistName: string;
    readonly producer: string;
    readonly arranger: string;
    readonly price: number;
    readonly youTubeLink?: string;
    readonly isTop: boolean;
    readonly previewId: number;
    readonly imageId: number;
    readonly fileId: number;
    readonly trackId?: number;
    readonly instruments: number[];
    readonly genres: number[];
}
