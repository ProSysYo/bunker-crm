import { CustomerFormValues } from "./customer-schema";

export type CustomerCreate = CustomerFormValues

export type Customer = CustomerCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};