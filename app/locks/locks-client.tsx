"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
    Button,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Input,
    Pagination,
} from "@heroui/react";
import Link from "next/link";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Edit, Plus, Trash, Search } from "lucide-react";
import { TLockFull } from "@/features/locks/types/TLock";
import { deleteLock } from "@/features/locks/actions";
import ConfirmDialog from "@/shared/ui/confirm-dialog";

interface Props {
    locks: TLockFull[];
    totalPages: number;
}

function useDebouncedCallback<T extends (...args: unknown[]) => void>(callback: T, delay: number): T {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return useCallback(
        (...args: unknown[]) => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(() => {
                (callback as (...args: unknown[]) => void)(...args);
            }, delay);
        },
        [callback, delay]
    ) as T;
}

export default function LocksClient({ locks, totalPages }: Props) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;
    const query = searchParams.get("query") || "";

    const [searchTerm, setSearchTerm] = useState(query);

    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const updateSearchURL = useCallback(
        (term: string) => {
            const params = new URLSearchParams(searchParams.toString());

            params.set("page", "1");

            if (term) {
                params.set("query", term);
            } else {
                params.delete("query");
            }

            const newURL = `${pathname}?${params.toString()}`;
            router.replace(newURL);
        },
        [pathname, router, searchParams]
    );

    const debouncedUpdateURL = useDebouncedCallback(updateSearchURL as (...args: unknown[]) => void, 300);

    const handleSearchChange = (value: string) => {
        setSearchTerm(value);
        debouncedUpdateURL(value);
    };

    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (page: number) => {
        router.push(createPageURL(page));
    };

    const handleDelete = async () => {
        if (confirmDeleteId === null) return;

        setDeletingId(confirmDeleteId);
        try {
            await deleteLock(confirmDeleteId);

            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить");
        } finally {
            setDeletingId(null);
            setConfirmDeleteId(null);
        }
    };

    const handleOpenConfirm = (id: number) => {
        setConfirmDeleteId(id);
    };

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
                <Input
                    placeholder="Поиск по названию или типу..."
                    value={searchTerm}
                    onValueChange={handleSearchChange}
                    startContent={<Search className="w-4 h-4 text-default-400" />}
                    size="lg"
                    className="max-w-md"
                />

                {totalPages > 1 && (
                    <Pagination
                        total={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        showControls
                        color="primary"
                        size="sm"
                    />
                )}
            </div>

            <Table aria-label="Таблица замков">
                <TableHeader>
                    <TableColumn>Название</TableColumn>
                    <TableColumn>Тип</TableColumn>
                    <TableColumn>Дата создания</TableColumn>
                    <TableColumn className="w-12"> </TableColumn>
                </TableHeader>
                <TableBody emptyContent="Замки не найдены">
                    {locks.map((lock) => (
                        <TableRow key={lock.id}>
                            <TableCell>{lock.name}</TableCell>
                            <TableCell>{lock.type}</TableCell>
                            <TableCell>{lock.createdAt.toLocaleString("ru-RU")}</TableCell>
                            <TableCell>
                                <div className="flex gap-1">
                                    <Link href={`/locks/${lock.id}`}>
                                        <Button
                                            isIconOnly
                                            size="sm"
                                            variant="light"
                                            color="primary"
                                            aria-label="Редактировать"
                                        >
                                            <Edit size={18} />
                                        </Button>
                                    </Link>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        variant="light"
                                        isLoading={deletingId === lock.id}
                                        onPress={() => handleOpenConfirm(lock.id)}
                                        aria-label="Удалить"
                                        className="min-w-0 w-auto px-2"
                                    >
                                        <Trash size={18} />
                                    </Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ConfirmDialog
                isOpen={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={handleDelete}
                title="Вы уверены?"
                confirmText="Удалить"
                cancelText="Отмена"
            >
                Это действие нельзя отменить. Вы действительно хотите удалить эту запись?
            </ConfirmDialog>
        </div>
    );
}
