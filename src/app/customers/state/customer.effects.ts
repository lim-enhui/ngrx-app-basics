import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import { EMPTY, Observable, of, from } from "rxjs";
import { map, mergeMap, catchError, exhaustMap } from "rxjs/operators";
import * as fromCustomerActions from "./customer.actions";
import * as fromCustomer from "./customer.reducer";
import { CustomerService } from "../customer.service";
import { Action, Store } from "@ngrx/store";
import { Customer } from "./../customer.model";

@Injectable()
export class CustomerEffects {
  loadCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomerActions.loadCustomers),
      mergeMap(() =>
        this.customerService.getCustomers().pipe(
          map((customers: Customer[]) =>
            fromCustomerActions.loadCustomersSuccess({ customers })
          ),
          catchError(error =>
            of(fromCustomerActions.loadCustomersFail({ error }))
          )
        )
      )
    )
  );

  loadCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomerActions.loadCustomer),
      mergeMap(action =>
        this.customerService.getCustomerById(action.selectedCustomerId).pipe(
          map(customer =>
            fromCustomerActions.loadCustomerSuccess({ customer })
          ),
          catchError(error =>
            of(fromCustomerActions.loadCustomerFail({ error }))
          )
        )
      )
    )
  );

  createCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomerActions.createCustomer),
      map(action => action.customer),
      mergeMap(customer =>
        this.customerService.createCustomer(customer).pipe(
          map(customer =>
            fromCustomerActions.createCustomerSuccess({ customer })
          ),
          catchError(error =>
            of(fromCustomerActions.createCustomerFail({ error }))
          )
        )
      )
    )
  );

  updateCustomer$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromCustomerActions.updateCustomer),
      map(action => action.customer),
      mergeMap(customer =>
        this.customerService.updateCustomer(customer).pipe(
          map((updateCustomer: Customer) =>
            fromCustomerActions.updateCustomerSuccess({
              customer: { id: updateCustomer.id, changes: updateCustomer }
            })
          ),
          catchError(error =>
            of(fromCustomerActions.updateCustomerFail({ error }))
          )
        )
      )
    )
  );

  deleteCustomer$: Observable<Action> = this.actions$.pipe(
    ofType(fromCustomerActions.deleteCustomer),
    map(action => action.selectedCustomerId),
    mergeMap((id: number) =>
      this.customerService.deleteCustomer(id).pipe(
        map(
          () =>
            fromCustomerActions.deleteCustomerSuccess({
              selectedCustomerId: id
            }),
          catchError(error =>
            of(fromCustomerActions.deleteCustomerFail({ error }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
}
