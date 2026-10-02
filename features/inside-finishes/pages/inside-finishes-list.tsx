"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { InsideFinish } from "../inside-finish-types";
import { InsideFinishesTable } from "../components/inside-finishes-table";

interface Props {
    items: InsideFinish[];
    totalPages: number;
}

export default function InsideFinishesList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Внутренняя отделка</h1>
                <Link href={routes.insideFinishesNew}>
                    <Button variant="default" size="lg">
                        Добавить вариант
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <InsideFinishesTable items={items} />
        </div>
    );
}