import { CommonFilter } from './common-filter';

export interface OtherFilesFilter extends CommonFilter {
    fileTypes: string[];
}