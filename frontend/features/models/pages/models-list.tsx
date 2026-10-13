"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { Model } from "../model-types";
import { ModelsTable } from "../components/models-table";

interface Props {
    items: Model[];
    totalPages: number;
}

export default function ModelsList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Модели</h1>
                <Link href={routes.modelsNew}>
                    <Button variant="default" size="lg">
                        Добавить модель
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по коду или названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <ModelsTable items={items} />
        </div>
    );
}