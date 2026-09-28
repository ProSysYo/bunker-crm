import { LOCK_TYPE_VALUES, lockTypeLabels } from "@/features/locks/types/TLockType";

export const lockTypes = LOCK_TYPE_VALUES.map((value) => ({
    value,
    label: lockTypeLabels[value],
}));
