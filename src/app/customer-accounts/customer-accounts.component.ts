import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {AccountDetails} from "../models/account.model";
import {CustomerAccounts} from "../models/Accounts.model";
import {AccountsService} from "../services/accounts.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../models/customer.model";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerAccountsFormGroup!: FormGroup;
  accountsId!: number;
  customer!: Customer;
  customerAccounts!: Observable<Array<CustomerAccounts>>

  constructor(private fb: FormBuilder, private accountsService: AccountsService, private route: ActivatedRoute, private router: Router) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer
  }

  ngOnInit(): void {
    this.accountsId = this.route.snapshot.params['id'];
    this.handleCustomerAccounts();
  }

  handleCustomerAccounts() {
    this.customerAccounts = this.accountsService.getCustomerAccounts(this.accountsId);
  }
}
