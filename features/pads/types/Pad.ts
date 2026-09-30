import { PadType } from "./PadType";

export type PadCreate = {
    name: string;
    type: PadType;
};

export type Pad = PadCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
