import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, take, tap} from "rxjs";
import {ReportService} from "../../services/report.service";
import {Order} from "../../interfaces/order";

@Component({
  selector:        'app-orders',
  templateUrl:     './orders.component.html',
  styleUrls:       ['./orders.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrdersComponent {

  orders$: Observable<Order[]> = this.reportService.orders$;
  totalPrice$: Observable<number> = this.reportService.totalPrice$;

  customerId?: number

  constructor(private activatedRoute: ActivatedRoute, private reportService: ReportService) {
    activatedRoute.params.pipe(take(1), tap(({id}) => {
      this.customerId = id;
      reportService.getAllOrdersByState(parseInt(id));
    })).subscribe()
  }

}
