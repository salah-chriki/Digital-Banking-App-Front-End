import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";
import {catchError, map, Observable, throwError} from "rxjs";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  customers!: Observable<Array<Customer>>;
  errorMessage!: String;
  searchFormGroup: FormGroup | undefined;

  constructor(private customerService: CustomerService, private fb: FormBuilder,private route:Router) {

  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.handleSearchCustomers();

  }

  handleSearchCustomers() {
    let keyword = this.searchFormGroup?.value.keyword
    this.customers = this.customerService.searchCustomers(keyword).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  protected readonly String = String;

  handleDeleteCustomer(c: Customer) {
    let conf=confirm("Are you sure!?")
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (resp) => {
        this.customers = this.customers.pipe(
          map(data => {
              let index = data.indexOf(c);
              data.slice(index, 1)
              return data
            }
          )
        )
      }
    })

  }

  handleCustomerAccounts(c: Customer) {
    this.route.navigateByUrl("/customer-accounts/"+c.id,{state:c});
  }
}
