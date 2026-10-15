import { getInsideFinish } from "@/features/inside-finishes/actions/get-inside-finish";
import { InsideFinishesEdit } from "@/features/inside-finishes/pages/inside-finishes-edit";
import { notFound } from "next/navigation";

export default async function InsideFinishesEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getInsideFinish(Number(id));

    if (!item) {
        notFound();
    }

    return <InsideFinishesEdit item={item} />;
}