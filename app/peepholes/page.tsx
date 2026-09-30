import { tableLimits } from "@/config/table-limits";
import { getPeepholes } from "@/features/peepholes/actions/get-peepholes";
import PeepholesList from "@/features/peepholes/pages/peepholes-list";

export default async function PeepholesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { peepholes, pagination } = await getPeepholes({
        search: query,
        page: currentPage,
        limit: tableLimits.peepholes,
    });

    return (
        <PeepholesList
            items={peepholes}
            totalPages={pagination.totalPages}
        />
    );
}