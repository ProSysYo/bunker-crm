"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { OutsideFinish } from "../outside-finish-types";
import { OutsideFinishesTable } from "../components/outside-finishes-table";

interface Props {
    items: OutsideFinish[];
    totalPages: number;
}

export default function OutsideFinishesList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Наружная отделка</h1>
                <Link href={routes.outsideFinishesNew}>
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
            <OutsideFinishesTable items={items} />
        </div>
    );
}