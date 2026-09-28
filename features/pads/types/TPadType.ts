export const PAD_TYPE_VALUES = [
    "cylinder",
    "suvaldny",
] as const;

//export type TPadType = "cylinder" | "suvaldny";
export type TPadType = typeof PAD_TYPE_VALUES[number];

export const padTypeLabels: Record<TPadType, string> = {
    cylinder: "цилиндр",
    suvaldny: "сувальда",
};
