import {Component, Input} from '@angular/core';
import {Order} from "../../interfaces/order";

@Component({
  selector:    'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls:   ['./products-table.component.css']
})
export class ProductsTableComponent {
  @Input('products') orders: Order[] = [];

  public trackByIndex(index: number, order: Order) {
    return order.orderNumber;
  }

}
