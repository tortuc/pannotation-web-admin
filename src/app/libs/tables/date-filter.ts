import { PaginationFilter } from '.';

export interface DateFilter extends PaginationFilter {
    orderBy?: string;
    orderType?: any;
    q?: string;
    dateFrom?: string;
    dateTo?: string;
}
