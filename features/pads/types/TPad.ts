import { TPadType } from "./TPadType";

export type TPadCreate = {
    name: string;
    type: TPadType;
};

export type TPadFull = TPadCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
