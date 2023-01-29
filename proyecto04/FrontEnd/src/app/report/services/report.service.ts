import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {BehaviorSubject, Observable, take, tap, withLatestFrom} from "rxjs";
import {Customer} from "../interfaces/customer";
import {Order} from "../interfaces/order";
import {CustomerPageable} from "../interfaces/customer-pageable";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private customers: BehaviorSubject<Customer[]> = new BehaviorSubject<Customer[]>([]);
  public customers$: Observable<Customer[]> = this.customers.asObservable();

  private orders: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public orders$: Observable<Order[]> = this.orders.asObservable();

  private products: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>([]);
  public products$: Observable<Order[]> = this.products.asObservable();

  private totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalPrice$: Observable<number> = this.totalPrice.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  public removeCustomers() {
    this.customers.next([]);
  }

  public getAllCustomersByPage(page: number) {
    const params: HttpParams = new HttpParams().set('page', page);
    this.httpClient.get<CustomerPageable>('http://localhost:8080/customers/all', {params})
      .pipe(take(1), withLatestFrom(this.customers$), tap(([customers, customers_old]) => {
        localStorage.setItem('page-customer', customers.nextPage?.toString());
        this.customers.next([...customers_old, ...customers.customers]);
      })).subscribe();
  }

  public getAllOrdersByState(customerId: number) {
    const params: HttpParams = new HttpParams().set('state', 'Shipped');
    this.httpClient.get<Order[]>(`http://localhost:8080/customers/ordersByIdCustomer/${customerId}`,
        {params})
      .pipe(take(1), tap((orders: Order[]) => {
        this.calculateTotalOrders(orders);
        this.orders.next(orders);
      })).subscribe();
  }

  public getAllOrders(customerId: number) {
    this.httpClient.get<Order[]>(`http://localhost:8080/customers/ordersByIdCustomer/${customerId}`)
      .pipe(take(1), tap((orders: Order[]) => {
        this.products.next(orders);
      })).subscribe();
  }

  public calculateTotalOrders(orders: Order[]) {
    this.httpClient.post<number>("http://localhost:8080/customers/ordersCalculate", {orders})
      .pipe(take(1), tap((total: number) => {
        this.totalPrice.next(total | 0)
      })).subscribe()
  }

}
