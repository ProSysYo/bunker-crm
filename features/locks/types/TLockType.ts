export type TLockType = "cylinder" | "suvaldny" | "cylinder_suvaldny" | "suvaldny_cylinder" | "code";

export const lockTypeLabels: Record<TLockType, string> = {
    cylinder: "цилиндр",
    suvaldny: "сувальда",
    cylinder_suvaldny: "цилиндр + сувальда",
    suvaldny_cylinder: "сувальда + цилиндр",
    code: "кодовый"
};
