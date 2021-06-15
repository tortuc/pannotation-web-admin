import { HttpParams } from '@angular/common/http';

export class FiltersHelper {
    static orderBy = 'orderBy';
    static orderType = 'orderType';
    static q = 'q';
    static searchTerm = 'Search';
    static fileTypes = 'fileTypes';

    static toHttpParams(filter: { [key: string]: any }): HttpParams {
        let params = new HttpParams();
        Object.keys(filter).forEach((key) => {
            if (filter[key]) {
                switch (key) {
                    case this.orderBy:
                        params = params.append('Order.Key', filter[key]);
                        break;
                    case this.orderType:
                        params = params.append('Order.Direction', filter[key]);
                        break;
                    case this.q:
                        params = params.append(this.searchTerm, encodeURIComponent(filter[key]));
                        break;
                    case this.fileTypes:
                        filter[key].forEach(x => {
                            params = params.append(this.fileTypes, encodeURIComponent(x));
                        });
                        break;
                    default:
                        params = params.append(key, filter[key]);
                        break;
                }
            }
        });
        return params;
    }
}
