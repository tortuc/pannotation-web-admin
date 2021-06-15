import { PaginationFilter } from './pagination-filter';
import { UserRole } from '../../models/user/user-roles';

export interface CommonFilter extends PaginationFilter {
    orderBy?: string;
    orderType?: any;
    q?: string;
    role?: UserRole;
}
