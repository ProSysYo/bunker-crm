import { TPadType } from "./TPadType";

export type TPadCreate = {
    name: string;
    type: TPadType;
};

export type TPad = TPadCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
