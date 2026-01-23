
import { notFound } from "next/navigation";
import { LockEdit } from "../../../features/locks/ui/pages/lock-edit";
import { getLock } from "@/features/locks/actions/get-lock";

export default async function LockEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const lock = await getLock(Number(id));

    if (!lock) {
        notFound();
    }

    return <LockEdit lock={lock} />;
}
