"use client";

import { CatalogTable, ColumnDef } from "@/shared/ui/table/catalog-table/catalog-table";
import { TKnob } from "../../types/TKnob";
import { deleteKnob } from "../../actions/delete-knob";
import { routes } from "@/config/navigation";

const knobColumns: ColumnDef<TKnob>[] = [
    { key: "name", label: "Название", render: (item) => item.name },

    {
        key: "updatedAt",
        label: "Дата обновления",
        render: (item) => item.updatedAt.toLocaleString("ru-RU"),
    },
    { key: "", label: " ", widthClass: "w-1" },
];

type Props = {
    knobs: TKnob[];
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
