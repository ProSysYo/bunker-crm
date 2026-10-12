import type { OrderFormOptions, SelectOption } from "./oreder-types";

export const toOptions = (rows: { name: string }[]): SelectOption[] =>
    rows.map((row) => ({ value: String(row.name), label: row.name }));

export const toCodeNameOptions = (rows: { code: string; name: string }[]): SelectOption[] =>
    rows.map((row) => ({ value: String(row.code), label: `${row.code} — ${row.name}` }));

export const toCodeOptions = (rows: { code: string; name: string }[]): SelectOption[] =>
    rows.map((row) => ({ value: String(row.code), label: `${row.code}` }));

export const mapOrderOptions = (catalogs: OrderFormOptions): Record<keyof OrderFormOptions, SelectOption[]> => ({
    customers: toCodeNameOptions(catalogs.customers),
    models: toCodeOptions(catalogs.models),
    locks: toOptions(catalogs.locks),
    pads: toOptions(catalogs.pads),
    knobs: toOptions(catalogs.knobs),
    bolts: toOptions(catalogs.bolts),
    peepholes: toOptions(catalogs.peepholes),
    paints: toOptions(catalogs.paints),
    ears: toOptions(catalogs.ears),
    packagings: toOptions(catalogs.packagings),
    jambHoles: toOptions(catalogs.jambHoles),
    hinges: toOptions(catalogs.hinges),
    outsideFinishes: toOptions(catalogs.outsideFinishes),
    insideFinishes: toOptions(catalogs.insideFinishes),
    foils: toOptions(catalogs.foils),
});
