import { PeepholeFormValues } from "./peephole-schema";

export type PeepholeCreate = PeepholeFormValues;

export type Peephole = PeepholeCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};