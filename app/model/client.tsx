"use client";

import { useState } from "react";
import { Button, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { deleteDoorModel } from "@/features/model/actions/door-model";
import Link from "next/link";
import { Delete, Edit } from "lucide-react";

interface DoorModel {
    id: string;
    name: string;
    description: string | null;
    outside: string | null;
    inside: string | null;
    isDouble: boolean;
}

interface ModelPageClientProps {
    initialModels: DoorModel[];
}

export default function ModelPageClient({ initialModels }: ModelPageClientProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string) => {
        if (!confirm("Удалить модель?")) return;

        setDeletingId(id);
        try {
            await deleteDoorModel(id);
            // Страница обновится автоматически через revalidatePath в action
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Не удалось удалить");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-semibold tracking-tight">Модели дверей</h1>
                <Link href="/model/new">
                    <Button color="primary">Добавить модель</Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableColumn>НАЗВАНИЕ</TableColumn>
                    <TableColumn>ОПИСАНИЕ</TableColumn>
                    <TableColumn>ВНЕШНЯЯ СТОРОНА</TableColumn>
                    <TableColumn>ВНУТРЕННЯЯ СТОРОНА</TableColumn>
                    <TableColumn>ДВОЙНАЯ</TableColumn>
                    <TableColumn>ДЕЙСТВИЯ</TableColumn>
                </TableHeader>
                <TableBody>
                    {initialModels.map((model) => (
                        <TableRow key={model.id}>
                            <TableCell>{model.name}</TableCell>
                            <TableCell>{model.description}</TableCell>
                            <TableCell>{model.outside}</TableCell>
                            <TableCell>{model.inside}</TableCell>
                            <TableCell>{model.isDouble ? "Да" : "Нет"}</TableCell>
                            <TableCell className="flex gap-2">
                                <Link href={`/model/${model.id}`}>
                                    <Button size="sm" variant="light" aria-label="Редактировать">
                                        
                                        <Edit size={18}/>
                                    </Button>
                                </Link>

                                <Button
                                    size="sm"
                                    color="danger"
                                    variant="light"
                                    isLoading={deletingId === model.id}
                                    onPress={() => handleDelete(model.id)}
                                    aria-label="Удалить"
                                >
                                    <Delete size={18}/>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
