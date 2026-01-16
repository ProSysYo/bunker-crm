"use client";

import { Button } from "@heroui/react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { TLockFull } from "@/features/locks/types/TLock";
import { LocksSearch } from "@/features/locks/ui/locks-search";
import { LocksPagination } from "@/features/locks/ui/locks-pagination";
import { LocksTable } from "@/features/locks/ui/locks-table";

interface Props {
    locks: TLockFull[];
    totalPages: number;
}

export default function LocksClient({ locks, totalPages }: Props) {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold">Замки</h1>
                <Link href="/locks/new">
                    <Button color="primary" endContent={<Plus size={20} />}>
                        Добавить замок
                    </Button>
                </Link>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <LocksSearch />

                <LocksPagination totalPages={totalPages} />
            </div>

            <LocksTable locks={locks} />
        </div>
    );
}
