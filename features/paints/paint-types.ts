import { PaintFormValues } from "./paint-schema";

export type PaintCreate = PaintFormValues;

export type Paint = PaintCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
