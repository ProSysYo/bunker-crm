import { tableLimits } from "@/config/table-limits";
import { getBolts } from "@/features/bolts/actions/get-bolts";
import BoltsList from "@/features/bolts/pages/bolts-list";

export default async function BoltsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { bolts, pagination } = await getBolts({
        search: query,
        page: currentPage,
        limit: tableLimits.bolts,
    });

    return (
        <BoltsList
            items={bolts}
            totalPages={pagination.totalPages}
        />
    );
}