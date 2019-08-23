import { Component, OnInit } from "@angular/core";

import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import * as fromCustomerActions from "../state/customer.actions";
import * as fromCustomer from "../state/customer.reducer";
import { Customer } from "../customer.model";

@Component({
  selector: "app-customer-list",
  templateUrl: "./customer-list.component.html",
  styleUrls: ["./customer-list.component.css"]
})
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  error$: Observable<String>;

  constructor(private store: Store<fromCustomer.AppState>) {}

  ngOnInit() {
    this.store.dispatch(fromCustomerActions.loadCustomers());
    this.customers$ = this.store.pipe(select(fromCustomer.getCustomers));
    this.error$ = this.store.pipe(select(fromCustomer.getError));
  }

  deleteCustomer(customer: Customer) {
    if (confirm("Are you sure you want to delete the user?")) {
      this.store.dispatch(
        fromCustomerActions.deleteCustomer({ selectedCustomerId: customer.id })
      );
    }
  }

  editCustomer(customer: Customer) {
    this.store.dispatch(
      fromCustomerActions.loadCustomer({ selectedCustomerId: customer.id })
    );
  }
}
