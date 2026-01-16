"use client";

import { useState } from "react";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import Link from "next/link";
import { Edit, Plus, Trash } from "lucide-react";
import { TLockFull } from "@/features/locks/types/TLock";
import { deleteLock } from "@/features/locks/actions";
import ConfirmDialog from "@/shared/ui/confirm-dialog";
import { useRouter } from "next/navigation";

interface Props {
    locks: TLockFull[];
}

export default function LocksClient({ locks }: Props) {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const handleOpenConfirm = (id: number) => {
        setConfirmDeleteId(id);
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

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Замки</h1>
                <Link
                    href="/locks/new"
                    className=""
                    aria-label="Добавить замок"
                >
                    <Button color="default" endContent={<Plus size={20}/>}>Добавить замок</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    
                    <TableColumn>Название</TableColumn>
                    <TableColumn>Тип замка</TableColumn>
                    <TableColumn>Добавлено</TableColumn>
                    <TableColumn className="w-12"> </TableColumn>
                </TableHeader>
                <TableBody>
                    {locks.map((lock) => (
                        <TableRow key={lock.id}>
                            
                            <TableCell>{lock.name}</TableCell>
                            <TableCell>{lock.type}</TableCell>
                            <TableCell>{lock.createdAt.toLocaleString()}</TableCell>
                            <TableCell className="flex gap-0">
                                <Link href={`/locks/${lock.id}`}>
                                    <Button size="sm" variant="light" aria-label="Редактировать" className="min-w-0 w-auto px-2">
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
