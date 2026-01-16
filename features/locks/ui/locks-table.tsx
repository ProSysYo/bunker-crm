import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { Edit, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { TLockFull } from "../types/TLock";
import ConfirmDialog from "@/shared/ui/confirm-dialog";
import { useRouter } from "next/navigation";
import { deleteLock } from "../actions";

type Props = {
    locks: TLockFull[];
};

export const LocksTable = ({ locks }: Props) => {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState<number | null>(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

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
        <>
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
        </>
    );
};
