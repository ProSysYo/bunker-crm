"use client";


import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/ui/table/pagination";
import { Search } from "@/shared/ui/table/search";
import { TPad } from "@/features/pads/types/TPad";
import { PadsTable } from "@/features/pads/ui/components/pads-table";
import { Button } from "@/shared/ui/shadcn/button";

interface Props {
    pads: TPad[];
    totalPages: number;
}

export default function Pads({ pads, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Накладки</h1>
                <Link href={routes.padsNew}>
                    <Button variant="default" size='lg'>
                        Добавить накладку
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>

            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>

            <PadsTable pads={pads} />
        </div>
    );
}
