import { EarFormValues } from "./ear-schema";

export type EarCreate = EarFormValues;

export type Ear = EarCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
