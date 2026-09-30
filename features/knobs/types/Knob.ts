export type KnobCreate = {
    name: string
}

export type Knob = KnobCreate & {
    id: number
    createdAt: Date
    updatedAt: Date
}