"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { Ear } from "../ear-types";
import { EarsTable } from "../components/ears-table";


interface Props {
    items: Ear[];
    totalPages: number;
}

export default function EarsList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Уши</h1>
                <Link href={routes.earsNew}>
                    <Button variant="default" size="lg">
                        Добавить уши
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <EarsTable items={items} />
        </div>
    );
}