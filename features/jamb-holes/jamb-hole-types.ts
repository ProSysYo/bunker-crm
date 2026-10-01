import { JambHoleFormValues } from "./jamb-hole-schema";


export type JambHoleCreate = JambHoleFormValues;

export type JambHole = JambHoleCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};