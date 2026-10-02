import { getFoil } from "@/features/foils/actions/get-foil";
import { FoilsEdit } from "@/features/foils/pages/foils-edit";
import { notFound } from "next/navigation";

export default async function FoilsEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const item = await getFoil(Number(id));

    if (!item) {
        notFound();
    }

    return <FoilsEdit item={item} />;
}