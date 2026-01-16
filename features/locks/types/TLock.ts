import { TLockType } from "./TLockType";

export type TLockCreate = {
    name: string;
    type: TLockType | string;
};

export type TLockFull = TLockCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
