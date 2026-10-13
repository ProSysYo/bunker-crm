"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { Paint } from "../paint-types";
import { PaintsTable } from "../components/paints-table";

interface Props {
    items: Paint[];
    totalPages: number;
}

export default function PaintsList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Покраски</h1>
                <Link href={routes.paintsNew}>
                    <Button variant="default" size="lg">
                        Добавить покраску
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <PaintsTable items={items} />
        </div>
    );
}
