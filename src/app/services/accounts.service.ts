import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "../models/account.model";
import {CustomerAccounts} from "../models/Accounts.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  public getAccount(accountId: String, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>("http://localhost:8080/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size)
  }

  public getCustomerAccounts(id:number): Observable<Array<CustomerAccounts>> {
    return this.http.get<Array<CustomerAccounts>>("http://localhost:8080/customer-accounts/"+id)
  }

  public debit(accountId: String, amount: number, description: String) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post("http://localhost:8080/accounts/debit", data)
  }

  public credit(accountId: String, amount: number, description: String) {
    let data = {accountId: accountId, amount: amount, description: description}
    return this.http.post("http://localhost:8080/accounts/credit", data)
  }

  public transfer(accountId: String, accountDestination: String, amount: number, description: String) {
    let data = {accountIdSource: accountId, accountIdDestination: accountDestination, amount: amount, description: description}
    return this.http.post("http://localhost:8080/accounts/transfer", data)
  }
}

