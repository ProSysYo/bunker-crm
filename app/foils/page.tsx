import { tableLimits } from "@/config/table-limits";
import { getFoils } from "@/features/foils/actions/get-foils";
import FoilsList from "@/features/foils/pages/foils-list";

export default async function FoilsPage(props: {
    searchParams?: Promise<{
        query?: string;
        page?: string;
    }>;
}) {
    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    
    const { foils, pagination } = await getFoils({
        search: query,
        page: currentPage,
        limit: tableLimits.foils,
    });

    return (
        <FoilsList
            items={foils}
            totalPages={pagination.totalPages}
        />
    );
}