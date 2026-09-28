import { PAD_TYPE_VALUES, padTypeLabels } from "@/features/pads/types/TPadType";

export const padTypes = PAD_TYPE_VALUES.map((value) => ({
    value,
    label: padTypeLabels[value],
}));
