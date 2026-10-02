import { FoilFormValues } from "./foil-schema";

export type FoilCreate = FoilFormValues;

export type Foil = FoilCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};