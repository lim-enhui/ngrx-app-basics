import { Action, createReducer, on } from "@ngrx/store";
import * as fromCustomerActions from "./customer.actions";
import * as fromRoot from "../../state/app-state";
import { Customer } from "../customer.model";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const customerFeatureKey = "customer";

export interface CustomerState extends EntityState<Customer> {
  selectedCustomerId: number | null;
  loading: boolean;
  loaded: boolean;
  error: string;
}

// export interface CustomerState {
//   customers: Customer[];
//   loading: boolean;
//   loaded: boolean;
//   error: string;
// }

export interface AppState extends fromRoot.AppState {
  customers: CustomerState;
}

export const customerAdapter: EntityAdapter<Customer> = createEntityAdapter<
  Customer
>();

export const defaultCustomer: CustomerState = {
  ids: [],
  entities: {},
  selectedCustomerId: null,
  loading: false,
  loaded: true,
  error: ""
};

export const initialState = customerAdapter.getInitialState(defaultCustomer);

// export const initialState: CustomerState = {
//   customers: [],
//   loading: false,
//   loaded: true,
//   error: ""
// };

const customerReducer = createReducer(
  initialState,
  on(fromCustomerActions.loadCustomers, state => ({
    ...state,
    loading: true
  })),
  on(fromCustomerActions.loadCustomersSuccess, (state, payload) => {
    return customerAdapter.addAll(payload.customers, {
      ...state,
      loading: false,
      loaded: true
    });
  }),
  on(fromCustomerActions.loadCustomersFail, (state, payload) => {
    return {
      ...state,
      entities: {},
      loading: false,
      loaded: false,
      error: payload.error
    };
  }),
  on(fromCustomerActions.updateCustomerSuccess, (state, payload) => {
    return customerAdapter.updateOne(payload.customer, state);
  })
);

// const customerReducer = createReducer(
//   initialState,
//   on(fromCustomerActions.loadCustomers, state => ({
//     ...state,
//     loading: true
//   })),
//   on(fromCustomerActions.loadCustomersSuccess, (state, payload) => ({
//     ...state,
//     loading: false,
//     loaded: true,
//     customers: payload.customers
//   })),
//   on(fromCustomerActions.loadCustomersFail, (state, payload) => ({
//     ...state,
//     customers: [],
//     loading: false,
//     loaded: false,
//     error: payload.error
//   }))
// );

export const getCustomerFeatureState = createFeatureSelector<CustomerState>(
  customerFeatureKey
);

// export const getCustomers = createSelector(
//   getCustomerFeatureState,
//   (state: CustomerState) => state.customers
// );

export const getCustomers = createSelector(
  getCustomerFeatureState,
  customerAdapter.getSelectors().selectAll
);

export const getCustomersLoading = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loading
);

export const getCustomersLoaded = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.loaded
);

export const getError = createSelector(
  getCustomerFeatureState,
  (state: CustomerState) => state.error
);

export function reducer(state: CustomerState | undefined, action: Action) {
  return customerReducer(state, action);
}
