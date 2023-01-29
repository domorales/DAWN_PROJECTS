import {Component, Input} from '@angular/core';
import {Order} from "../../interfaces/order";

@Component({
  selector:    'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls:   ['./orders-table.component.css']
})
export class OrdersTableComponent {
  @Input('orders') orders: Order[] = [];
  @Input('total') total: number | null = 0;

  calculateTotalForItem(price: number, quantity: number) {
    return Math.round(price * quantity * 100) / 100;
  }

  public trackByIndex(index: number, order: Order) {
    return order.orderNumber;
  }

}
