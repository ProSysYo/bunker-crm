"use client";

import { CatalogTable, ColumnDef } from "@/shared/components/table/catalog-table/catalog-table";
import { Knob } from "../types/Knob";
import { deleteKnob } from "../actions/delete-knob";
import { routes } from "@/config/navigation";

const knobColumns: ColumnDef<Knob>[] = [
    { key: "name", label: "Название", render: (item) => item.name },

    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", className: "w-1" },
];

type Props = {
    knobs: Knob[];
};

export const KnobsTable = ({ knobs }: Props) => {
    return (
        <CatalogTable
            data={knobs}
            columns={knobColumns}
            emptyContent="Ручки не найдены"
            ariaLabel="Таблица ручек"
            onDelete={deleteKnob}
            getEditHref={(item) => `${routes.knobsEdit}${item.id}`}
        />
    );
};
