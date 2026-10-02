import { tableLimits } from "@/config/table-limits";
import { getInsideFinishes } from "@/features/inside-finishes/actions/get-inside-finishes";
import InsideFinishesList from "@/features/inside-finishes/pages/inside-finishes-list";

export default async function InsideFinishesPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { insideFinishes, pagination } = await getInsideFinishes({
        search: query,
        page: currentPage,
        limit: tableLimits.insideFinishes,
    });

    return (
        <InsideFinishesList
            items={insideFinishes}
            totalPages={pagination.totalPages}
        />
    );
}