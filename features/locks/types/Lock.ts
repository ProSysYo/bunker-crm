import { LockType } from "./LockType";

export type LockCreate = {
    name: string;
    type: LockType;
};

export type Lock = LockCreate & {
    id: number
    createdAt: Date;
    updatedAt: Date;
};
