import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ReportService} from "../../services/report.service";
import {Observable} from "rxjs";
import {Customer} from "../../interfaces/customer";

@Component({
  selector:        'app-customers',
  templateUrl:     './customers.component.html',
  styleUrls:       ['./customers.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomersComponent {

  customers$: Observable<Customer[]> = this.reportService.customers$;

  constructor(private reportService: ReportService) {
    this.reportService.removeCustomers();
    this.reportService.getAllCustomersByPage(0);
  }

  public onScroll() {
    const page = localStorage.getItem('page-customer');
    if (page) {
      this.reportService.getAllCustomersByPage(parseInt(page));
    }

  }
}
