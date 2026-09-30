export const LOCK_TYPE_VALUES = [
    "cylinder",
    "suvaldny",
    "cylinder_suvaldny",
    "suvaldny_cylinder",
    "code",
] as const;

export type LockType = typeof LOCK_TYPE_VALUES[number];

//export type LockType = "cylinder" | "suvaldny" | "cylinder_suvaldny" | "suvaldny_cylinder" | "code";

export const lockTypeLabels: Record<LockType, string> = {
    cylinder: "цилиндр",
    suvaldny: "сувальда",
    cylinder_suvaldny: "цилиндр + сувальда",
    suvaldny_cylinder: "сувальда + цилиндр",
    code: "кодовый"
};
