"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/components/table/pagination";
import { Search } from "@/shared/components/table/search";
import { Button } from "@/shared/components/shadcn/button";
import { Customer } from "../customer-types";
import { CustomersTable } from "../components/customers-table";

interface Props {
    items: Customer[];
    totalPages: number;
}

export default function CustomersList({ items, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Клиенты</h1>
                <Link href={routes.customersNew}>
                    <Button variant="default" size="lg">
                        Добавить клиента
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>
            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по коду или названию" />
                <Pagination totalPages={totalPages} />
            </div>
            <CustomersTable items={items} />
        </div>
    );
}