import { getHinge } from "@/features/hinges/actions/get-hinge";
import { HingesEdit } from "@/features/hinges/pages/hinges-edit";
import { notFound } from "next/navigation";

export default async function HingesEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getHinge(Number(id));

    if (!item) {
        notFound();
    }

    return <HingesEdit item={item} />;
}