export type BoltCreate = {
    name: string;
};

export type Bolt = BoltCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
