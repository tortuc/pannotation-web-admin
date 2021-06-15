import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { OrdersService } from '../services/orders.service';
import { OrderDetailsModel } from '../models/order/order-detail-model';

@Injectable()
export class OrderResolver implements Resolve<OrderDetailsModel> {
    constructor(private readonly ordersService: OrdersService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<OrderDetailsModel> {
        const orderId = parseInt(route.params.id, 10);

        return this.ordersService.getOne(orderId);
    }
}
