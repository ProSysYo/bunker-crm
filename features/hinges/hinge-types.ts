import { HingeFormValues } from "./hinge-schema";

export type HingeCreate = HingeFormValues

export type Hinge = HingeCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};