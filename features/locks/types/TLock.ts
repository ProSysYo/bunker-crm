import { TLockType } from "./TLockType";

export type TLockCreate = {
    name: string;
    type: TLockType;
};

export type TLockFull = TLockCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
