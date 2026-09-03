"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/ui/table/pagination";
import { Search } from "@/shared/ui/table/search";
import { TKnob } from "../../types/TKnob";
import { KnobsTable } from "../components/knobs-table";

interface Props {
    knobs: TKnob[];
    totalPages: number;
}

export default function KnobsList({ knobs, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Ручки</h1>
                <Link href={routes.knobsNew}>
                    <Button color="primary" endContent={<Plus size={20} />}>
                        Добавить ручку
                    </Button>
                </Link>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <Search placeholder="Поиск по названию" />

                <Pagination totalPages={totalPages} />
            </div>

            <KnobsTable knobs={knobs} />
        </div>
    );
}
