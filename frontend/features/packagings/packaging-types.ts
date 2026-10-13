import { PackagingFormValues } from "./packaging-schema";


export type PackagingCreate = PackagingFormValues;

export type Packaging = PackagingCreate & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
};
