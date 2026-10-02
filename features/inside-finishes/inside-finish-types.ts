import { InsideFinishFormValues } from "./inside-finish-schema";

export type InsideFinishCreate = InsideFinishFormValues;

export type InsideFinish = InsideFinishCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};