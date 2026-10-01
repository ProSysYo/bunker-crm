"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { JambHole } from "../jamb-hole-types";
import { JambHolesTable } from "../components/jamb-holes-table";

interface Props {
    items: JambHole[];
    totalPages: number;
}

export default function JambHolesList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Отверстия в косяке</h1>
                <Link href={routes.jambHolesNew}>
                    <Button variant="default" size="lg">
                        Добавить отверстие
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <JambHolesTable items={items} />
        </div>
    );
}