export type TKnobCreate = {
    name: string
}

export type TKnob = TKnobCreate & {
    id: number
    createdAt: Date
    updatedAt: Date
}