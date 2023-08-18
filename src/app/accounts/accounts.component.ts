import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountsService} from "../services/accounts.service";
import {AccountDetails} from "../models/account.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  operationFromGroup!: FormGroup;
  currentPage: number = 0;
  size: number = 5;
  accountObservable$!: Observable<AccountDetails>;

  constructor(private fb: FormBuilder, private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control("")
    });
    this.operationFromGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null)
    });
  }

  handleSearchAccount() {
    let accountId: String = this.accountFormGroup.value.accountId
    this.accountObservable$ = this.accountsService.getAccount(accountId, this.currentPage, this.size);

    // .subscribe({
    //     next:(data) => {
    //       this.accountDetails=data;
    //     },error:(err)=>{
    //       console.log(err)
    //     }
    //   })
  }

  goToPage(page: number) {
    this.currentPage = page
    this.handleSearchAccount()
  }

  handleAccountOperation() {
    let accountId:String = this.accountFormGroup.value.accountId;
    let amount:number = this.operationFromGroup.value.amount;
    let description:String = this.operationFromGroup.value.description;
    let operationType:String = this.operationFromGroup.value.operationType;
    if (operationType == 'DEBIT') {
      this.accountsService.debit(accountId, amount, description).subscribe({
        next:(data)=>{
          alert("debit successful")
          this.handleSearchAccount()
        },error:(err)=>{
          console.log(err)
        }
      })
    } else if (operationType == 'CREDIT') {
      this.accountsService.credit(accountId, amount, description).subscribe({
        next:(data)=>{
          alert("credit successful")
          this.handleSearchAccount()
        },error:(err)=>{
          console.log(err)
        }
      })
    } else if (operationType == 'TRANSFER') {
      let accountDestination = this.operationFromGroup.value.accountDestination
      this.accountsService.transfer(accountId, accountDestination, amount, description).subscribe({
        next:(data)=>{
          alert("transfer successful")
          this.handleSearchAccount()
        },error:(err)=>{
          console.log(err)
        }
      })
    }
  }
}
