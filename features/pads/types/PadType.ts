export const PAD_TYPE_VALUES = [
    "cylinder",
    "suvaldny",
] as const;

//export type PadType = "cylinder" | "suvaldny";
export type PadType = typeof PAD_TYPE_VALUES[number];

export const padTypeLabels: Record<PadType, string> = {
    cylinder: "цилиндр",
    suvaldny: "сувальда",
};
