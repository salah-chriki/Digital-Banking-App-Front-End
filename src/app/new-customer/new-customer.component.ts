import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../models/customer.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup!: FormGroup;

  constructor(private customerService: CustomerService, private ncfb: FormBuilder,private router:Router) {
  }

  //
  ngOnInit(): void {
    this.newCustomerFormGroup = this.ncfb.group({
      name: this.ncfb.control(null,[Validators.required,Validators.minLength(5)]),
      email: this.ncfb.control(null,[Validators.required,Validators.email])
    });

  }

  handleNewCustomer() {
    let customer:Customer=this.newCustomerFormGroup.value
    this.customerService.addCustomer(customer).subscribe({
      next:value => {
        alert("added")
        this.router.navigateByUrl("/customers")
      },error:err => {
        console.log(err)
      }
    })
  }
}
