import { TLockType } from "./TLockType";

export type TLockCreate = {
    name: string;
    type: TLockType;
};

export type TLock = TLockCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
