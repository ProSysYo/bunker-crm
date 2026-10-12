import type { Customer } from "@/features/customers/customer-types";
import type { Model } from "@/features/models/model-types";
import type { Lock } from "@/features/locks/types/Lock";
import type { Pad } from "@/features/pads/types/Pad";
import type { Knob } from "@/features/knobs/types/Knob";
import type { Bolt } from "@/features/bolts/bolt-types";
import type { Peephole } from "@/features/peepholes/peephole-types";
import type { Paint } from "@/features/paints/paint-types";
import type { Ear } from "@/features/ears/ear-types";
import type { Packaging } from "@/features/packagings/packaging-types";
import type { JambHole } from "@/features/jamb-holes/jamb-hole-types";
import type { Hinge } from "@/features/hinges/hinge-types";
import type { OutsideFinish } from "@/features/outside-finishes/outside-finish-types";
import type { InsideFinish } from "@/features/inside-finishes/inside-finish-types";
import type { Foil } from "@/features/foils/foil-types";

export type SelectOption = {
    value: string;
    label: string;
};

export type OrderFormOptions = {
    customers: Customer[];
    models: Model[];
    locks: Lock[];
    pads: Pad[];
    knobs: Knob[];
    bolts: Bolt[];
    peepholes: Peephole[];
    paints: Paint[];
    ears: Ear[];
    packagings: Packaging[];
    jambHoles: JambHole[];
    hinges: Hinge[];
    outsideFinishes: OutsideFinish[];
    insideFinishes: InsideFinish[];
    foils: Foil[];
};
