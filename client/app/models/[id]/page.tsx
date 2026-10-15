import { getModel } from "@/features/models/actions/get-model";
import { ModelsEdit } from "@/features/models/pages/models-edit";
import { notFound } from "next/navigation";

export default async function ModelsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getModel(Number(id));

    if (!item) {
        notFound();
    }

    return <ModelsEdit item={item} />;
}