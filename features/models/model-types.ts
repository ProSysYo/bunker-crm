import { ModelFormValues } from "./model-schema";

export type ModelCreate = ModelFormValues

export type Model = ModelCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};