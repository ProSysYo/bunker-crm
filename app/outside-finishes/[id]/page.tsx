import { getOutsideFinish } from "@/features/outside-finishes/actions/get-outside-finish";
import { OutsideFinishesEdit } from "@/features/outside-finishes/pages/outside-finishes-edit";
import { notFound } from "next/navigation";

export default async function OutsideFinishesEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getOutsideFinish(Number(id));

    if (!item) {
        notFound();
    }

    return <OutsideFinishesEdit item={item} />;
}