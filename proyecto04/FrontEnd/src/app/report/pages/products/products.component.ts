import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ReportService} from "../../services/report.service";
import {Observable, take, tap} from "rxjs";
import {Order} from "../../interfaces/order";

@Component({
  selector:    'app-products',
  templateUrl: './products.component.html',
  styleUrls:   ['./products.component.css']
})
export class ProductsComponent {
  products$: Observable<Order[]> = this.reportService.products$;
  customerId?: number

  constructor(private activatedRoute: ActivatedRoute, private reportService: ReportService) {
    activatedRoute.params.pipe(take(1), tap(({id}) => {
      this.customerId = id;
      reportService.getAllOrders(parseInt(id));
    })).subscribe()
  }
}
