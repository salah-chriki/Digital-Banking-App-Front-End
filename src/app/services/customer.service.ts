import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, publish} from "rxjs";
import {Customer} from "../models/customer.model";
import {CustomersComponent} from "../customers/customers.component";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  backendHost: String = "http://localhost:8080"

  constructor(private http: HttpClient) {
  }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost + "/customers")
  }


  public searchCustomers(keyword: String): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(this.backendHost + "/customers/search?keyword=" + keyword)
  }

  public addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.backendHost + "/new-customer", customer)
  }

  public deleteCustomer(customerId: number) {
    return this.http.delete(this.backendHost + "/customers/" + customerId)
  }
}
