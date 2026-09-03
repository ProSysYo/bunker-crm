"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TLock } from "@/features/locks/types/TLock";
import { LocksTable } from "@/features/locks/ui/components/locks-table";
import { routes } from "@/config/navigation";
import { Pagination } from "@/shared/ui/table/pagination";
import { Search } from "@/shared/ui/table/search";

interface Props {
    locks: TLock[];
    totalPages: number;
}

export default function Locks({ locks, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Замки</h1>
                <Link href={routes.locksNew}>
                    <Button variant="primary">
                        Добавить замок
                        <Plus size={20} />
                    </Button>
                </Link>
            </div>

            <div className="mb-4 flex justify-between">
                <Search placeholder="Поиск по названию" />
                <Pagination totalPages={totalPages} />
            </div>

            <LocksTable locks={locks} />
        </div>
    );
}
