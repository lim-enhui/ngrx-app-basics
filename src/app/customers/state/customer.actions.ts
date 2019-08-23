import { createAction, props } from "@ngrx/store";
import { Customer } from "../customer.model";
import { Update } from "@ngrx/entity";

export const loadCustomers = createAction("[Customer Page] Load Customers");
export const loadCustomersSuccess = createAction(
  "[Customer Page] Load Customers Success",
  props<{ customers: Customer[] }>()
);
export const loadCustomersFail = createAction(
  "[Customer Page] Load Customers Fail",
  props<{ error: string }>()
);

export const loadCustomer = createAction(
  "[Customer Page] Load Customer",
  props<{ selectedCustomerId: number }>()
);
export const loadCustomerSuccess = createAction(
  "[Customer Page] Load Customer Success",
  props<{ customer: Customer }>()
);
export const loadCustomerFail = createAction(
  "[Customer Page] Load Customer Fail",
  props<{ error: string }>()
);

export const createCustomer = createAction(
  "[Customer Page] Create Customer",
  props<{ customer: Customer }>()
);
export const createCustomerSuccess = createAction(
  "[Customer Page] Create Customers Success",
  props<{ customer: Customer }>()
);
export const createCustomerFail = createAction(
  "[Customer Page] Create Customers Fail",
  props<{ error: string }>()
);

export const updateCustomer = createAction(
  "[Customer Page] Update Customers",
  props<{ customer: Customer }>()
);
export const updateCustomerSuccess = createAction(
  "[Customer Page] Update Customers Success",
  props<{ customer: Update<Customer> }>()
);
export const updateCustomerFail = createAction(
  "[Customer Page] Update Customers Fail",
  props<{ error: string }>()
);

export const deleteCustomer = createAction(
  "[Customer Page] Delete Customers",
  props<{ selectedCustomerId: number }>()
);
export const deleteCustomerSuccess = createAction(
  "[Customer Page] Delete Customers Success",
  props<{ selectedCustomerId: number }>()
);
export const deleteCustomerFail = createAction(
  "[Customer Page] Delete Customers Fail",
  props<{ error: string }>()
);
