import { lockTypeLabels, TLockType } from "@/features/locks/types/TLockType";

export const lockTypes: { key: TLockType; label: string }[] = [
    { key: "cylinder", label: lockTypeLabels.cylinder },
    { key: "suvaldny", label: lockTypeLabels.suvaldny },
    { key: "cylinder_suvaldny", label: lockTypeLabels.cylinder_suvaldny },
    { key: "suvaldny_cylinder", label: lockTypeLabels.suvaldny_cylinder },
    { key: "code", label: lockTypeLabels.code },
];
