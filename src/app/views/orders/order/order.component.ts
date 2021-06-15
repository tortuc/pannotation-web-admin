import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../../../models/order/order-detail';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../models/order/order-item';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Order & OrderDetails;
  constructor(private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.initOrder();
  }

  initOrder(): void {
    this.order = this.activatedRoute.snapshot.data.order;
  }
}
