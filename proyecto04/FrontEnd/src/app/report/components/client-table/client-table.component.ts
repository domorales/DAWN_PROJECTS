import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Customer} from "../../interfaces/customer";

@Component({
  selector:        'app-client-table',
  templateUrl:     './client-table.component.html',
  styleUrls:       ['./client-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientTableComponent {

  @Input('customers') customers: Customer[] = [];

  public trackByIndex(index: number, customer: Customer) {
    return customer.id;
  }
}
