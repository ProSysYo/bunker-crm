import { getLock } from "@/features/locks/actions";
import { notFound } from "next/navigation";
import { EditLockClient } from "./edit-lock-client";

export default async function EditLockPageRoute({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lock = await getLock(Number(id));

    if (!lock) {
        notFound();
    }

    return <EditLockClient lock={lock} />;
}
