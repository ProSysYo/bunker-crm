import { TLockType } from "./TLockType"

export type TLock = {
    id: number
    name: string
    type:  TLockType | string
    createdAt: Date;
    updatedAt: Date;
}