import {Customer} from "./customer";

export interface CustomerPageable {
  customers: Customer[],
  nextPage: number
}
