import { OutsideFinishFormValues } from "./outside-finish-schema";

export type OutsideFinishCreate = OutsideFinishFormValues

export type OutsideFinish = OutsideFinishCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};