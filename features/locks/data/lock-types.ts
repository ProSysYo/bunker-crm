import { lockTypeLabels, TLockType } from "@/features/locks/types/TLockType";

export const lockTypes: { value: TLockType; label: string }[] = [
    { value: "cylinder", label: lockTypeLabels.cylinder },
    { value: "suvaldny", label: lockTypeLabels.suvaldny },
    { value: "cylinder_suvaldny", label: lockTypeLabels.cylinder_suvaldny },
    { value: "suvaldny_cylinder", label: lockTypeLabels.suvaldny_cylinder },
    { value: "code", label: lockTypeLabels.code },
];
