import { tableLimits } from "@/config/table-limits";
import { getPaints } from "@/features/paints/actions/get-paints";
import PaintsList from "@/features/paints/pages/paints-list";

export default async function PaintsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const { paints, pagination } = await getPaints({
        search: query,
        page: currentPage,
        limit: tableLimits.peepholes,
    });

    return <PaintsList items={paints} totalPages={pagination.totalPages} />;
}
